import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const TableRow = ({id, type, status, userSurname, userName, patronymic, account, terminal, created_date}) => {

    const date = new Date(created_date).toLocaleDateString()
    let time = new Date(created_date).toLocaleTimeString().slice(0,-3)
    const [type2, setType2] = useState(type)
    const [account2, setAccount2] = useState(account)
    const [time2, setTime2] = useState(time)    

    const pathId = id.toString()

    const statusClass = ['status']
    let status_text = ''
    if (status !== '') {
        switch(status) {
            case 'new':
                statusClass.push('status__new')
                status_text = 'Новое'
                break                
            case 'started':
                statusClass.push('status__panding')
                status_text = 'Выполняется'
                break                
            case 'assigned_to':
                statusClass.push('status__assigned')
                status_text = 'Назначено'
                break                
            case 'completed':
                statusClass.push('status__done')
                status_text = 'Выполнено'
                break                
            case 'declined':
                statusClass.push('status__cancel')
                status_text = 'Отменено'
                break                
            default: 
                statusClass.push('')
        }
    }

    const [width, setWidth] = useState(0);
    const resText = () => {
        if(width > 600 && width < 830 || width < 476 ) {
            setType2(`${type.slice(0,20)}...`)
            setAccount2(`${account.slice(0,20)}...`) 
        } else if (width > 830 || width < 600) {
            setType2(type)
            setAccount2(account)
        }
        if (width < 685 && width > 600) {
            setTime2(`${time.slice(0,1)}...`)
        } else if (width > 686 || width < 600){
            setTime2(time)
        }
    }

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth); 
            resText()       
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions) 

    }, [width]);


  return (
    <>  
        <tr>
            
            <td data-label="Номер / Дата">
                <Link className="tr__link" to={pathId}>
                    {id}
                    <span className="last">{date} {time2}</span>
                </Link>
            </td>
            <td data-label="Тип задания / Автор">
                <Link className="tr__link" to={pathId}>
                    {type2}
                    <span className="last">{userSurname} {userName}. {patronymic}.</span>
                </Link>
            </td>
            <td data-label="Аккаунт / Терминал">
                <Link className="tr__link" to={pathId}>
                    {account2}
                    <span className="last">{terminal}</span>
                </Link>
            </td>
            <td className="th__status" data-label="Статус" id="th__status_id">
                <Link className="tr__link" to={pathId}>
                    <span className={statusClass.join(' ')}>{status_text}</span>
                </Link>
            </td>
        </tr>
    </>
  )
}

export default TableRow;
