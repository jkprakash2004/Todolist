import React, { useEffect, useState } from 'react'
import "./todo.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//localstorage get data
const getdata=()=>{
    const list=localStorage.getItem("todoList")
    if(list){
      return JSON.parse(localStorage.getItem("todoList"))
    }
    else{
      return []
    }
  }
  

const TodoList = () => {

    const [name,setName]=useState('')
    const [edit,setEdit]=useState(false)
    const [message,setMessage]=useState('')
    const [items,setItems]=useState(getdata())
    const [editid,setEditid]=useState(null)
    
    useEffect(()=>{
        localStorage.setItem("todoList",JSON.stringify(items))
      },[items])

//Add data and Edit data      
    function submit(id){
        //edit data
        if(name && edit){
           setItems(items.map((e)=>{
            if(e.id===editid){
                console.log("hii");
                return {...e , title:name}
            }
            return e
           }));           
        toast("changed successfully")           
        setName('')
        setEditid(null)
        setEdit(false)        
        }else{
            //add data
            if(name){
                const time=new Date().getHours()+"/"+new Date().getMinutes()
                const day=new Date().getDay()+"/"+new Date().getMonth()+"/"+new Date().getFullYear()
                const id=items.length?items[items.length -1].id+1:1
                const res={id:id,title:name,timeDate:{time:time,day:day}}
                const list=[...items,res]
                setItems(list)
                toast.success("Insert one Data")
                setName("")
            }else{
                setMessage("please type...")
                setTimeout(() => {
                    setMessage("")
                }, 2000);
            }
        }
    }
//delete data    
    function handleDel(id){
        const del=items.filter((e)=>e.id!==id)                        
        setItems(del)
        submit()
    }
//edit data    
    function handleEdit(id){
        setEdit(true)
        const name=items.find((e)=>e.id===id)
        setName(name.title)
        setEditid(id)        
    }
//all data clear    
    function clearall(){        
        setItems([])
    }

return (
    <div className='todolist'>
        <div className='navbar'>
            <div>TodoList</div>
            <div></div>
            
        </div>
        <div className='container'>
            
        <div className='todo-int'>
            <input placeholder={message?message:"Enter Content..."} value={name} onChange={(e)=>setName(e.target.value)} className='int'/>
            <button className='btn' onClick={submit}>+</button>
        </div>
        <div className='todo-List'>
                {items.length>0?(
                    <div className='container'>
                        {items.map((e)=>{
                            return(
                                <div className='todo-data'>
                                    <div className='list'>{e.id}.      {e.title}</div>
                                    <div className='finish'>
                                        <p>finished</p>
                                        </div>
                                    <div className='time'>
                                            <span>{e.timeDate.day}</span>
                                            <button className='del' style={{backgroundColor:"blueviolet"}} onClick={()=>handleEdit(e.id)}>Edit</button>
                                            <button className='del' onClick={()=>handleDel(e.id)}>del</button>

                                            </div>
                                </div>
                            )
                        })}
                    </div>
                ):(
                    <div className='empty'>No Data..</div>
                )}
                
        </div>
        <div className='clear'>
        
            <button className='btn' onClick={clearall}>Clear all</button>
        </div>
        </div>
        <ToastContainer/>
</div>
  )
}

export default TodoList




