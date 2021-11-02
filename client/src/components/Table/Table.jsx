import React from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { IoFilterSharp } from 'react-icons/io5';
import { AiTwotoneEdit } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import titles from '../../utils/tableTitles';
import './Table.css';
import sort from '../../asserts/sort.png';

function Table({ tasks }) {
  const history = useHistory();

  const handleHistory = (id) => {
    history.push(`/${id}`);
  };

  const handleStatus = (e) => {

  };

  const handleTableContent = (el) => (
    <tr key={el.id}>
      <td data-col-title="ID" className="task" onClick={() => handleHistory(el.id)}>{el.id}</td>
      <td data-col-title="Categoria">{el.category}</td>
      <td data-col-title="Tarefa">{el.task}</td>
      <td data-col-title="Usuário">{el.author}</td>
      <td data-col-title="Status">
        <select name="" id="" onClick={handleStatus}>
          <option value={el.status} defaultValue>{el.status}</option>
          <option value="inProgress">Em andamento</option>
          <option value="paused">Pausado</option>
          <option value="done">Pronto</option>
        </select>

      </td>
      <td data-col-title="Data">{el.createAt}</td>
      <td>
        <AiTwotoneEdit
          className="table-icon"
                  // onClick={() => handleEditTable(gt._id,
                  //   guitarTable, setState, state, initialState)}
          type="button"
        />
      </td>
      <td>
        <RiDeleteBin2Fill
          className="table-icon remove-table-icon"
                  // onClick={() => handleDeleteRow(gt._id, {
                  //   setState, initialState, page, setPage,
                  // }, paginate(valueFilter, 5))}
          type="button"
        />

      </td>
    </tr>
  );

  const handleTableHead = () => (
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
          <th>
            <IoFilterSharp
              className="table-icon filter-icon"
              type="button"
            />
          </th>
          <th className="sort-warning">
            <div className="msg-popup">
              Clique nos títulos para ordernar a tabela.
            </div>
            <img src={sort} alt="sort" />

          </th>
        </tr>

      </thead>
      <tbody>
        {/* {valueFilter && valueFilter.length > 0
              ? (paginate(valueFilter, 5)[page].map((gt) => ( */}
        {tasks
          && (tasks.map((el) => (
            handleTableContent(el)
          ))

          )}
        {/* ))) : <tr><td>Not found</td></tr> } */}
      </tbody>
    </table>
  );

  const handleBtnsTable = () => (
    <div className="btns-table">
      <button
            // disabled={page === paginate(valueFilter, 5).length - 1}
            // onClick={handlePagination}
        type="button"
        name="next"
      >
        Proximo
      </button>
      {/* {page > 0 && ( */}
      <button
        type="button"
        name="back"
      >
        Voltar
      </button>
      {/* )} */}
    </div>
  );

  return (
    <div className="responsive-container">
      {handleTableHead()}
      {handleBtnsTable()}

    </div>
  );
}

export default Table;
