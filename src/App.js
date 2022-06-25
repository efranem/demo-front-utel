
/* import { useState } from 'react'; */
import './App.css';
import { DataViewItems } from './components/DataViewItems';

function App() {

/*   const [query, setQuery] = useState(''); */

/*   const restApi = async () => {
    console.log(query);
    const api = await fetch("http://localhost:8080/BackUtel/api/search?query="+query);
    const items  = await api.json();

    setItems(items);
  } */

  return (
/*      <div className="App">
      <header className="App-header">
        <h1 className='title'> Demo API UTEL</h1>
        <h5>Buscador de productos Mercado Libre (ARG) </h5>
          <span className="p-float-label p-input-icon-left">
              <i className="pi pi-search" />
              <InputText className='InputQuery' id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
              <label htmlFor="query">   termino de busqueda</label>
              <button onClick={restApi} className="btn-search" >Buscar</button>
          </span>

         


        { items ? ( 
          
          
        ): <p>No info</p>
        }
        

      </header>
    </div>  */
    <DataViewItems />
  ); 
}

 export default App;
 