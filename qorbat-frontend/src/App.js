import React from 'react';
import { createClient } from '@supabase/supabase-js';
import ImmigrantForm from './components/ImmigrantForm';  // Assuming ImmigrantForm is in the same directory
import ImmigrantDisplay from './components/ImmgirantDisplay';

// Initialize Supabase client
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

function App() {
    return (
        <div className="App">
          <h1>Qorbat App</h1>
            <h2>Add Immigrant Data</h2>
            <ImmigrantForm />
            <p>Please submit at least the name and industry of individuals who were born outside of the United States and have made a lasting impact in their field of work inside the United States.</p>
            <ImmigrantDisplay />
        </div>
    );
}

export default App;
