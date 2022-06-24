import React, {useState} from 'react'
import  './Pagination.module.scss';

const Pagination = ({onNextHandler, onNextHandlerTwo, onPrevHandler, onPrevHandlerTwo, onSelectOffset, currentPage, endItems, startItems, limit, total}) => {

  return (   
    <div className="pagination">
      <div className="pag__text">записи {startItems}-{endItems}</div>
      <ul>
        <li><a href="#" className={currentPage === 1 ? 'disabled' : ''} onClick={(e) => onPrevHandlerTwo(e)}>&lt;&lt;</a></li>
        <li><a href="#" className={currentPage === 1 ? 'disabled' : ''} onClick={(e) => onPrevHandler(e)}>&lt;</a></li>
        <li className="page">{currentPage}</li>
        <li><a href="#" className={currentPage === total ? 'disabled' : ''} onClick={(e) => onNextHandler(e)}>&gt;</a></li>
        <li><a href="#" className={currentPage === total ? 'disabled' : ''} onClick={(e) => onNextHandlerTwo(e)}>&gt;&gt;</a></li>
      </ul>
      <div className="pag__text">по</div>
      <select id="select__offset" name="offset" className="select" onChange={(e) => onSelectOffset(Number(e.target.value))} value={limit}>
        <option value={5}>5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
      <div className="pag__text">записей</div>
    </div>
  )
}

export default Pagination;
