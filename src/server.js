const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceaccountkey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sluggie-93a0d-default-rtdb.firebaseio.com'
});

// Support JSON payloads
app.use(express.json());

const healthGoalsMapping = {
  'WeightLoss': { field: 'Fat', order: 'asc' },
  'MuscleGain': { field: 'Protein', order: 'desc' },
  'IncreasedEnergy': { field: 'Calories', order: 'desc' },
  'ImprovedFitness': { field: 'Fat', order: 'asc' },
  'StressReduction': { field: 'Fat', order: 'desc' },
  'BetterDigestion': { field: 'Protein', order: 'desc' },
};

function getQueryForHealthGoal(ref, goal) {
  const { field, order } = healthGoalsMapping[goal];
  if (order === 'asc') {
    return ref.orderByChild(field);
  } else {
    return ref.orderByChild(field).limitToLast(1); // Gets the highest value
  }
}


app.post('/filter-goals', (req, res) => {
  console.log('Request received for /filter-goals endpoint');
  console.log('Request body:', req.body);
  const healthGoal = req.body.healthGoals[0]; // Assume this comes from the request
  if (!healthGoalsMapping[healthGoal]) {
    return res.status(400).send('Invalid health goal');
  }

  const ref = admin.database().ref('Entree');
  const query = getQueryForHealthGoal(ref, healthGoal);

  query.once('value', (snapshot) => {
    if (snapshot.exists()) {
      // Assuming you want to send the entries back to the client
      const entries = [];
      snapshot.forEach((childSnapshot) => {
        const entry = childSnapshot.val(); // This will log each entry to the console
        entries.push(entry);
      });
    
    const { field, order } = healthGoalsMapping[healthGoal];
    entries.sort((a, b) => order === 'asc' ? a[field] - b[field] : b[field] - a[field]);
    
    // Select the topmost entry based on the sorted order
    const topEntryGlobal = entries.length > 0 ? entries[0] : null;

    console.log('Top entry for health goal:', topEntryGlobal);
    res.status(200).json(topEntryGlobal); // Sends the entries as a response

    } else {
      console.log(`No entries found for the health goal: ${healthGoal}`);
      res.status(404).send('No entries found for the specified health goal.');
    }
  }).catch((error) => {
    console.error('Error querying Firebase:', error);
    res.status(500).send('Error querying database');
  });
});

app.post('/filter-entrees-by-allergy', (req, res) => {
  console.log('Request received for /filter-entrees-by-allergy endpoint');
  console.log('Request body:', req.body);
  const userAllergies = req.body.allergies; 


  if (!userAllergies || userAllergies.length === 0) {
    // Handle case where no allergies are provided
  }

  const entreeRef = admin.database().ref('Entree');
  entreeRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      return res.status(404).send('No entrees found.');
    }
  
    let filteredEntrees = [];
    snapshot.forEach(childSnapshot => {
      const entree = childSnapshot.val();
      // Check if the entree's Allergy field matches the user's allergy (case insensitive)
      const hasAllergy = userAllergies.some(allergy => 
        entree.Allergy && entree.Allergy.toLowerCase() === allergy.toLowerCase()
      );
    
      // If the entree does not contain the allergy, include it in the filtered list
      if (!hasAllergy) {
        filteredEntrees.push(entree);
      }
    });

    console.log('Filtered Entrees:', filteredEntrees);

    res.status(200).json(filteredEntrees);
  }).catch(error => {
    console.error('Error querying Firebase:', error);
    res.status(500).send('Error querying database');
  });
});

// Endpoint to filter entrees based on dietary lifestyle
app.post('/filter-entrees', (req, res) => {
    console.log('Request received for /filter-entrees endpoint');
    console.log('Request body:', req.body);
  
    let dietaryLifestyle = req.body.dietaryLifestyle;
    dietaryLifestyle = dietaryLifestyle.charAt(0).toUpperCase() + dietaryLifestyle.slice(1).toLowerCase();
  
    if (!dietaryLifestyle) {
      console.log('No dietary lifestyle provided');
      return res.status(400).send('Dietary lifestyle is required');
    }
  
    console.log('Filtering for dietary lifestyle:', dietaryLifestyle);
    const ref = admin.database().ref('Entree');
  
    ref.orderByChild('Dietary Lifestyle').equalTo(dietaryLifestyle).once('value', (snapshot) => {
      console.log('Firebase query executed');
      
      if (snapshot.exists()) {
        console.log('Entries found');
        console.log(`Entries for ${dietaryLifestyle}:`, snapshot.val());
        const options = [];
        snapshot.forEach((childSnapshot) => {
          options.push(childSnapshot.val());
        });
        res.status(200).json(options);
      } else {
        console.log(`No entrees found for the specified dietary lifestyle: ${dietaryLifestyle}`);
        res.status(404).send('No entrees found for the specified dietary lifestyle.');
      }
    }).catch((error) => {
      console.error('Error querying Firebase:', error);
      res.status(500).send('Error querying database');
    });
  });

  app.get('/get-top-entry', (req, res) => {
    const ref = admin.database().ref('Entree');

    ref.orderByChild('Time').equalTo('Lunch').once('value', (snapshot) => {
        if (snapshot.exists()) {
            let topEntry = null;
            let topEntryName = ""; // Variable to store the name of the entree
            snapshot.forEach((childSnapshot) => {
                const entryName = childSnapshot.key; // Get the entree name (key)
                const entry = childSnapshot.val();
                if (entry['Dietary Lifestyle'] === 'Vegan' && (!topEntry || entry.Fat > topEntry.Fat)) {
                    topEntry = entry;
                    topEntryName = entryName; // Store the entree name
                }
            });

            if (topEntry) {
                console.log('top entry is', topEntryName, topEntry);
                // Send an object that includes both the entree name and its details
                res.status(200).json({
                    entree: topEntryName,
                    location: topEntry['Location '], // Ensure you use the correct key here
                    calories: topEntry.Calories,
                    protein: topEntry.Protein,
                    fat: topEntry.Fat
                });
            } else {
                res.status(404).send('No top entry found for Lunch and Vegan.');
            }
        } else {
            res.status(404).send('No Lunch entries found.');
        }
    }).catch((error) => {
        console.error('Error querying Firebase:', error);
        res.status(500).send('Error querying database');
    });
});

// Helper function to convert snapshot to an array
function snapshotToArray(snapshot) {
    const result = [];
    snapshot.forEach(childSnapshot => {
        const entry = childSnapshot.val();
        result.push(entry);
    });
    return result;
}

// Helper function to sort entries based on the health goal
function sortEntries(entries, healthGoal) {
    // Add your sorting logic here based on the health goal
    // For example:
    return entries.sort((a, b) => b.Calories - a.Calories); // descending sort as an example
}


  app.get('/get-breakfast-item', (req, res) => {
    const ref = admin.database().ref('Entree');
  
    // Query for the item with Time set to "Breakfast"
    ref.orderByChild('Time').equalTo('Breakfast').once('value', snapshot => {
      if (snapshot.exists()) {
        const breakfastItem = snapshot.val();
        const entreekey =  Object.keys(breakfastItem)[0];
        const mealinfo = breakfastItem[entreekey]

        const result = {
          entree: entreekey, // The name of the entree
          location: mealinfo.Location, // Access the Location from the mealInfo
          calories: mealinfo.Calories, // Access the Calories from the mealInfo
          protein: mealinfo.Protein, // Access the Protein from the mealInfo
          fat: mealinfo.Fat // Access the Fat from the mealInfo
       };
        console.log('Sending breakfast item:', result);
        // Respond with the breakfast items
        res.status(200).json(result);
      } else {
        res.status(404).send('No breakfast items found.');
      }
    }).catch((error) => {
      console.error('Error querying Firebase:', error);
      res.status(500).send('Error querying database');
    });
  });

  app.get('/get-dinner-item', (req, res) => {
    const ref = admin.database().ref('Entree');
  
    // Query for the item with Time set to "Dinner"
    ref.orderByChild('Time').equalTo('Dinner').once('value', snapshot => {
      if (snapshot.exists()) {
        const dinnerItem = snapshot.val();
        
        const entreeKey = Object.keys(dinnerItem)[0]; // This gets the entree name which is the key
        const mealInfo = dinnerItem[entreeKey];  // This accesses the object with meal info
    
        // Respond with the dinner items
        const result = {
          entree: entreeKey, // The name of the entree
          location: mealInfo.Location, // Access the Location from the mealInfo
          calories: mealInfo.Calories, // Access the Calories from the mealInfo
          protein: mealInfo.Protein, // Access the Protein from the mealInfo
          fat: mealInfo.Fat // Access the Fat from the mealInfo
       };

        console.log('Sending dinner item:', result);
        res.status(200).json(result);
      } else {
        res.status(404).send('No dinner items found.');
      }
    }).catch((error) => {
      console.error('Error querying Firebase:', error);
      res.status(500).send('Error querying database');
    });
  });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});