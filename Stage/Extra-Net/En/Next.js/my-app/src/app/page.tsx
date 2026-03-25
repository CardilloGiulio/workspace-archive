'use client';

import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {
  const [dati, setDati] = useState(null);
  const [datiForm, setDatiForm] = useState({id: '', firstName: '', lastName: '', email: '', birthDate: ''});

  const GET = async () => {
    try {
      const response = await axios.get('http://localhost:5011/api/HumanResources');
      setDati(response.data);
    } catch (error) {
      console.error('Errore nella chiamata GET:', error);
    }
  }

  const POST = async () => {
    try {
      console.log(datiForm);
      await axios.post('http://localhost:5011/api/HumanResources', datiForm);
    } catch (error) {
      console.error('Errore nella chiamata POST:', error);
    }
  }
  const [start, setStart] = useState('');
  const [suggestionsName, setSuggestions] = useState<Array<any>>([]);

  useEffect (() => {
    fetch('https://api.datamuse.com/sug?s=' + start)
      .then(response => response.json())
      .then(data => {
        setSuggestions(data)
      })
  }, [start]);

  return (
    <div>
      <button onClick={GET}>Chiama la GET</button>
      { <pre>{JSON.stringify(dati, null, 2)}</pre> }
      <br />
      <button onClick={POST}>Chiama la POST</button>

      <div>
        <label>
          Id: <input type="text" onChange={(e) => { setDatiForm(datiForm => ({...datiForm, id: e.target.value}))}}/>
        </label><br />
        <label>
          First name: <input type="text" onChange={(e) => { setDatiForm(datiForm => ({...datiForm, firstName: e.target.value})), setStart(e.target.value)}}/>
        </label><br />
        <label>
          Last name: <input type="text" onChange={(e) => { setDatiForm(datiForm => ({...datiForm, lastName: e.target.value}))}}/>
        </label><br />
        <label>
          Email: <input type="text" onChange={(e) => { setDatiForm(datiForm => ({...datiForm, email: e.target.value}))}}/>
        </label><br />
        <label>
          Birth date: <input type="date" onChange={(e) => { setDatiForm(datiForm => ({...datiForm, birthDate: e.target.value}))}}/>
        </label>
      </div><br />
      <ul>
      {suggestionsName.map((suggestion, i) => (
        <li key={suggestion.word + i}>{suggestion.word}</li>
      ))}
    </ul>
    </div>
  );
}