import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';

import React, { useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import './DataView.css';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

export const DataViewItems = () => {

    const [products, setProducts] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        {label: 'Precio mas ALTO primero', value: '!price'},
        {label: 'Precio mas BAJO primero', value: 'price'},
    ];

    const [query, setQuery] = useState('');
    const [soloNuevos, setSoloNuevos] = useState(false);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const itemTemplate = (data, layout) => {

        return (
            <div className="col-12 md:col-2">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <span>
                        {data.condition === "new" ? (
                        <>
                            <span className="nuevo"> NUEVO </span>
                        </>
                        ) : (
                        <>
                            <span className="usado"> USADO </span>
                        </>
                        )}
                        </span>
                    </div>
                    <div className="product-grid-item-content">
                    <img src={data.thumbnail} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.title} />
                        <div className="product-name">{data.title}</div>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${data.price}</span>
                        <span className="product-stock">Stock: {data.availableQuantity}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Ordenar por precio" onChange={onSortChange}/>
                </div>
                <div className="col-6" style={{textAlign: 'right'}}>                    
                    <Checkbox inputId="nuevos" onChange={e => setSoloNuevos(e.checked)} checked={soloNuevos}></Checkbox>
                    <label htmlFor="nuevos"> Solo Nuevos</label>
                </div>
            </div>
        );
    }

    const restApi = async () => {
        console.log(query);
        const api = await fetch("http://localhost:8080/BackUtel/api/search?query="+query+(soloNuevos ? "&contdition=new" : ""));
        const items  = await api.json();
    
        setProducts(items);
      }
    
    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <div className="App">
                <header className="App-header">
                    <h1 className='title'> Demo API UTEL</h1>
                    <h5>Buscador de productos Mercado Libre (ARG) </h5>
                    <span className="p-float-label p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='InputQuery' id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <label htmlFor="query">   Termino de busqueda</label>
                        <button onClick={restApi} className="btn-search" >Buscar</button>
                    </span>
                </header>
                <div className="card">
                <DataView value={products} header={header}
                        itemTemplate={itemTemplate} paginator rows={30}
                        sortOrder={sortOrder} sortField={sortField} emptyMessage="Sin resultados"/>
            </div>
            </div>
            
        </div>
    );

      

    
}

const rootElement = document.getElementById("root");
ReactDOM.render(<DataViewItems />, rootElement);