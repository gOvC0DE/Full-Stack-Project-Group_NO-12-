import React, { useState } from 'react';
import { Container, Navbar, Form } from 'react-bootstrap';
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom'
import { customizedSelector } from "../UserManagement/UserReducer"
import { getLoginInfo } from '../UserManagement/PostMessage'
import '../Styling/BasicUI.css'

const AppNavBar = ({ onSearch }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const prevLocation = useLocation();
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const response = getLoginInfo({ token: localStorage.getItem("token") });
		dispatch(response);
	}, [])

	const { userInfo, fulfilled } = useSelector(customizedSelector);

	const onLogOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		navigate('/')
	}

	const handleSearchChange = (e) => {
		const query = e.target.value;
		setSearchText(query);
		if (onSearch) {
			onSearch(query);
		}
	};

	return (
		<Navbar className="nav-bar">
			<Container fluid>
				<Navbar.Brand href="/" className="nav-brand">
					STARFLIX
				</Navbar.Brand>
				<Form className="d-flex">
					<Form.Control
						type="search"
						placeholder="Search movies & theaters..."
						className="me-2 search-input"
						value={searchText}
						onChange={handleSearchChange}
					/>
				</Form>
				<div className="nav-buttons">
					{fulfilled ? (
						<>
							<button 
								className="nav-btn manage-btn" 
								onClick={() => navigate('/' + userInfo.id + '/reserve_manage')}
							>
								Manage Bookings
							</button>
							<span className="text-white">{userInfo.username}</span>
							<button className="nav-btn login-btn" onClick={onLogOut}>Sign Out</button>
						</>
					) : (
						<>
							<button className="nav-btn login-btn" onClick={() => navigate('/login')}>Login</button>
							<button className="nav-btn register-btn" onClick={() => navigate('/registration')}>Register</button>
						</>
					)}
				</div>
			</Container>
		</Navbar>
	);
}

export default AppNavBar;