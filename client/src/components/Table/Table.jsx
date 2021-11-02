import React from 'react';
import titles from '../../utils/tableTitles';
import './Table.css';

function Table({ tasks }) {
  return (
    <div className="responsive-container">
      <table
        rules="none"
        border="1"
        className="smart-table"
      >
        <thead>
          <tr>
            {titles.map((title) => (
              <th
                key={title.id}
                name={title.state}
              >
                {title.value}
              </th>
            ))}

            <th className="sort-warning">
              <div className="msg-popup">
                Clique nos títulos para ordernar a tabela.
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <input
                className="table-filters-input"
                type="text"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks
          && (tasks.map((el) => (
            <tr>
              <td data-col-title="ID">{el.id}</td>
              <td data-col-title="Categoria">{el.category}</td>
              <td data-col-title="Tarefa">{el.task}</td>
              <td data-col-title="Usuário">{el.author}</td>
              <td data-col-title="Status">{el.status}</td>
              <td data-col-title="Data">{el.createAt}</td>
            </tr>
          ))
          )}
        </tbody>
      </table>
      <div className="btns-table">
        <button
          type="button"
          name="next"
        >
          Proximo
        </button>
        <button
          type="button"
          name="back"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Table;
