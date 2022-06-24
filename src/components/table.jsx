import React, {useEffect, useState} from 'react'
import axios from 'axios';
import TableRow from './tableRow'
import Pagination from './Pagination/pagination';

//import users from '../assets/test_data.json'

const Table = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);
    const [startItems, setStartItems] = useState(1);
    const [endItems, setEndItems] = useState(5);
    const [totalItems, setTotalItems] = useState(100);
    const [total, setTotal] = useState(20);

    const onNextHandler = (e) => {
        e.preventDefault()
        setCurrentPage(currentPage + 1)
    }
    const onNextHandlerTwo = (e) => {
        e.preventDefault()
        setCurrentPage(total)
    }
    const onPrevHandlerTwo = (e) => {
        e.preventDefault()
        setCurrentPage(1)
    }
    const onPrevHandler = (e) => {
        e.preventDefault()
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const onSelectOffset = (number) => {
        setLimit(Number(number))
        if (number > limit) {
            if (currentPage === 5 && number === 25) {
                setCurrentPage(totalItems / number)              
            } else if (currentPage === 10 && number === 25) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 20 && number === 25) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 5 && number === 20) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 10 && number === 20) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 20 && number === 20) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 5 && number === 10) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 10 && number === 10) {
                setCurrentPage(totalItems / number) 
            } else if (currentPage === 20 && number === 10) {
                setCurrentPage(totalItems / number) 
            }
        }
    }

    useEffect(() => {
        const loadAllUsers = async () => {
            const response = await axios.get(`http://localhost:3001/users`)
            setTotalItems(response.data.length)
        }   
        loadAllUsers()        
        setTotal(Number(totalItems / limit / currentPage))   
    }, [])

    useEffect(() => {
        setIsLoading(true)

        const loadUsers = async () => {
            const response = await axios.get(`http://localhost:3001/users?_page=${currentPage}&_limit=${limit}`)
            setUsers(response.data)              
        }

        loadUsers()
        setIsLoading(false)      
        if (currentPage >= 2) {
            setStartItems(endItems - limit + 1)
        } else {
            setStartItems(1 * currentPage)
        }
        setEndItems(Number(currentPage) * Number(limit))
        
        setTotal(Number(totalItems / limit))
         
    }, [limit, currentPage, endItems, startItems, total])
    
    const usersItems = users.map((row) => (
        <TableRow 
            key={row.id} 
            id={row.id} 
            type={row.order_type.name} 
            status={row.status} 
            userSurname={row.created_user.surname} 
            userName={row.created_user.name.slice(0,1)}
            patronymic={row.created_user.patronymic.slice(0,1)}
            account={row.account.name}
            terminal={row.terminal.name}
            created_date={row.created_date}
        />
    ))
    const errorLoading = (<tr><td>Данные не получены...</td></tr>)   
    
    
  return (
    <div className="container">
        <div className="main__table">
            <table className="table">
                <thead>
                    <tr>
                        <th className="title">Номер / Дата</th>
                        <th className="title">Тип задания / Автор</th>
                        <th className="title">Аккаунт / Терминал</th>
                        <th className="title th__status">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    { isLoading ? errorLoading : usersItems }
                </tbody>
            </table>
        </div>
        <Pagination 
            onNextHandler={onNextHandler} 
            onNextHandlerTwo={onNextHandlerTwo}
            onPrevHandler={onPrevHandler}
            onPrevHandlerTwo={onPrevHandlerTwo}
            onSelectOffset={onSelectOffset} 
            currentPage={currentPage} 
            endItems={endItems} 
            startItems={startItems} 
            limit={limit}
            total={total}
        />       
    </div>
  )
}

export default Table;