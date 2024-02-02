import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddStudent } from '../redux/action/adminAction'
import AdminHomeHelper from '../Components/AdminHomeHelper'


const AdminAddStudent = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [section, setSection] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [studentMobileNumber, setContactNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error1,setError1]=React.useState(null)

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    function ifStringIsNumber(_string){
        return !(Number.isNaN(Number(_string)))
            
    }
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(!ifStringIsNumber(studentMobileNumber)){
            setError1("Not a valid mobile number.")
            setIsLoading(false)
            return
        }
        if(!ifStringIsNumber(fatherMobileNumber)){
            setError1("Not a valid  mobile number.")
            setIsLoading(false)
            return
        }
        if(!ifStringIsNumber(aadharCard)){
            setError1("Not a valid aadhar.")
            setIsLoading(false)
            return
        }
        else{
        dispatch(adminAddStudent({
            name,
            email,
            year,
            department,
            fatherName,
            aadharCard,
            gender,
            section: section.toUpperCase(),
            dob: dob.split("-").reverse().join("-"),
            studentMobileNumber,
            fatherMobileNumber
        }))
    } 
}
    useEffect(() => {
        if (store.admin.adminAddStudentFlag) {
            setError({})
        }
    }, [store.admin.adminAddStudentFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddStudentFlag) {
            setIsLoading(false)
        }
    }, [store.error, store.admin.adminAddStudentFlag])
    return (
        <div>
            {store.admin.isAuthenticated ? <><AdminHomeHelper />
                <div className="container mt-5">
                    {error1 && <p style={{color:"red"}}>{error1}</p>}
                    <div className="row ">
                        <div className="col">
                            <form onSubmit={formHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nameId">Student Name</label>
                                            <input onChange={(e) => setName(e.target.value)} type="text" required className={classnames("form-control",
                                                {
                                                    'is-invalid': error.name
                                                })} id="nameId" />
                                            {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emailId">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" required className={classnames("form-control",
                                                {
                                                    'is-invalid': error.email
                                                })} id="emailId" />
                                            {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="departmentId">Department</label>
                                            <select onChange={(e) => setDepartment(e.target.value)} required className={classnames("form-control",
                                                {
                                                    'is-invalid': error.department
                                                })} id="departmentId">
                                                <option>Select</option>
                                                <option value="E.C.E">E.C.E</option>
                                                <option value="C.S.E">C.S.E</option>
                                                <option value="I.T">I.T</option>
                                                <option value="E.E.E">E.E.E</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Civil">Civil</option>
                                            </select>
                                            {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="yearId">Year</label>
                                            <select onChange={(e) => setYear(e.target.value)} required className={classnames("form-control",
                                                {
                                                    'is-invalid': error.year
                                                })} id="yearId">
                                                <option>Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                            {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="sectionId">Section</label>
                                            <input onChange={(e) => setSection(e.target.value)} type="text" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.section
                                                })} id="sectionId" />
                                            {error.section && (<div className="invalid-feedback">{error.section}</div>)}
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="dobId">DOB</label>
                                            <input onChange={(e) => setDob(e.target.value)} type="date" required className={classnames("form-control",
                                                {
                                                    'is-invalid': error.dob
                                                })} id="dobId" />
                                            {error.dob && (<div className="invalid-feedback">{error.dob}</div>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        
                                        <div className="form-group">
                                            <label htmlFor="genderId">Gender</label>
                                            <select onChange={(e) => setGender(e.target.value)} required class="form-control" id="genderId">
                                                <option>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numberId">Contact Number</label>
                                            <input onChange={(e) => setContactNumber(e.target.value)} required type="text" maxLength="10" minLength="10" class="form-control" id="numberId" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fatherId">Father Name</label>
                                            <input onChange={(e) => setFatherName(e.target.value)} required type="text"  class="form-control" id="fatherId" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fathercnId">Father Contact Number</label>
                                            <input onChange={(e) => setFatherContactNumber(e.target.value)} required type="text" maxLength="10" minLength="10" className="form-control" id="fathercnId" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="aadharId">Aadhar Card Number</label>
                                            <input onChange={(e) => setAadharCard(e.target.value)} required type="text" maxLength="12" minLength="12" className="form-control" id="aadharId" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn btn-info  ">Add Student</button>}
                            </form>
                        </div>
                    </div>
                </div></>:(history.push('/'))}
            
            </div>

            
      
    )
}

export default AdminAddStudent
