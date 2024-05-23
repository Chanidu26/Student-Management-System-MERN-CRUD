import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Add = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gpa, setGpa] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            axios.put(`http://localhost:8000/users/${editId}`, {
                name,
                age,
                gpa
            })
            .then(res => {
                window.alert('Updated Succesfully')
                fetchStudents();
                resetForm();
            })
            .catch(err => {
                console.error(err);
                
            });
        } else {
            axios.post('http://localhost:8000/users', {
                name,
                age,
                gpa
            })
            .then(res => {
                fetchStudents();
                resetForm();
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    const resetForm = () => {
        setName('');
        setAge('');
        setGpa('');
        setEditMode(false);
        setEditId(null);
    };

    const editUser = (student) => {
        setName(student.name);
        setAge(student.age);
        setGpa(student.gpa);
        setEditMode(true);
        setEditId(student._id);
    };

    const fetchStudents = () => {
        axios.get('http://localhost:8000/users')
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    };
    const deleteuser = (id,name) => {
        if(window.confirm(`Are you want to delete user ${name}`)){
        axios.delete(`http://localhost:8000/users/${id}`)
        .then(
            () => {fetchStudents() }
         )
        .catch(err => console.error(err))
       }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
         <div class="container mt-5">
            <h2>Student Management System</h2>
            <div class="container mt-4">
              <form onSubmit={handleSubmit} class="flex-form">
    
                 <div class="mb-3">
                   <label for="name" class="form-label">Name</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                    required 
                   />
                 </div>

                <div class="mb-3">
                  <label for="age" class="form-label">Age</label>
                  <input 
                   type="number" 
                   class="form-control" 
                   id="age" 
                   value={age} 
                   onChange={(e) => setAge(e.target.value)} 
                   placeholder="Enter your age" 
                   required 
                    />
                </div>

                <div class="mb-3">
                  <label for="gpa" class="form-label">GPA</label>
                  <input 
                  type="number" 
                  step="0.01" 
                  class="form-control" 
                  id="gpa" 
                  value={gpa} 
                  onChange={(e) => setGpa(e.target.value)} 
                  placeholder="Enter your GPA" 
                  required 
                  />
                </div>

                <div class= "mt-4">
                   <button type="submit" class="btn btn-primary">{editMode ? 'Update User' : 'Add User'}</button>
                </div>

              </form>
            </div>
         </div>

            
        <div className="container mt-3">
             <table className="table custom-table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">GPA</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gpa}</td>
                            
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm mr-2"  
                                     onClick={()=> editUser(student)}  
                                >Update
                                </button>

                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={()=> deleteuser(student._id,student.name)}
                                > Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
        </>
    );
};

export default Add;
