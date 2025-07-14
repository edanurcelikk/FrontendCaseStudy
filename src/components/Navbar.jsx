import React, { createElement, useContext, useEffect } from 'react'
import '../css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/hepsiburada-logo.jpg';
import { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx'
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { CardContext } from '../context/CardContext.jsx';
import Card from './Card.jsx';
import CardContent from './CardContent.jsx';

function Navbar({ setSearchProduct }) {

    const [isToggleOpen, setToogleOpen] = useState(false);

    const showCart = () => {
        setToogleOpen(!isToggleOpen);
    }

    const handleInputChange = (e) => { setSearchProduct(e.target.value) }

    const { cardItems, isDeleteModalOpen, cancelDelete, confirmDeleteItem, requestDeleteItem } = useContext(CardContext);


    return (
        <>
            <div className='navbar-container' style={{ position: 'relative' }}>
                <img src={logo} id='logo' style={{ position: 'relative', right: '30px' }}></img>
                <FontAwesomeIcon id='icon' icon={faMagnifyingGlass} />

                <Input type="search"
                    placeholder="25 milyondan fazla ürün içerisinde ara"
                    onChange={handleInputChange}
                    className="navbar-input"
                    style={{
                        borderRadius: '18px',
                        border: '1px solid #ccc',
                        height: '40px',
                        backgroundColor: 'rgba(236,236,236,255)'
                    }}
                ></Input>
                <Button className='cart-btn' onClick={showCart} style={{
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                }} > Sepetim</Button>

                <div className='number-of-products' style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{cardItems.length !== 0 ? cardItems.length : null}</div>
            </div >



            {isToggleOpen ?
                <div className='cart-menu' style={{
                    width: '400px',
                    height: '400px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    zIndex: '1000',
                    // position: 'fixed',
                    // right: '230px',
                    // top: '120px',
                    position: 'absolute',
                    right: '200px',
                    top: '120px',
                    backgroundColor: 'white',
                    overflow: 'scroll',
                    scrollbarWidth: 'thin',
                    boxSizing: 'border-box',
                }}>
                    {cardItems.length === 0 ?
                        <p style={{ marginLeft: '15px' }}>
                            Sepetiniz boş.
                        </p> :
                        cardItems.map((item) => (
                            <Card key={item.id} style={{
                                width: '100%',
                                height: '100px',
                                padding: '8px',
                                overflow: 'hidden'

                            }}>

                                <CardContent image={item.image}
                                    imageStyle={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'contain',
                                        padding: '4px',
                                        marginRight: '12px',
                                    }}
                                >
                                    <div style={{
                                        position: 'relative', left: '90px', bottom: '90px'
                                    }} >
                                        <p style={{}}> {item.name}</p>
                                    </div>
                                    <div style={{ position: 'relative', left: '90px', bottom: '90px' }}>
                                        <Button onClick={() => requestDeleteItem(item)} style={{
                                            width: '50px',
                                            height: '20px',
                                            borderRadius: '6px',
                                            border: '1px solid orange',
                                            color: 'orange',
                                            backgroundColor: 'white',
                                            cursor: 'pointer'
                                        }}>Kaldır</Button>
                                    </div>
                                </CardContent>

                            </Card>
                        ))
                    }

                </div>
                : null
            }


            {isDeleteModalOpen && (
                <div style={{
                    width: '400px',
                    height: '300px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    zIndex: 1000
                }}>
                    <p><b>Ürünü silmek istediğinize emin misiniz?</b></p>
                    <hr style={{ marginTop: '20px' }}></hr>
                    <p style={{ marginTop: '30px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam omnis eaque minima in dolores, est vel suscipit voluptatibus voluptates quo quas amet temporibus quibusdam doloremque officiis aspernatur! Tenetur, maxime aspernatur.Lorem ipsum dolor sit amet consectetur adipisicing elit.Totam omnis eaque minima in dolores.</p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '40px' }}>
                        <Button onClick={() => { confirmDeleteItem() }} style={{
                            width: '70px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid green',
                            color: 'white',
                            backgroundColor: 'green',
                            cursor: 'pointer'
                        }}>EVET</Button>

                        <Button onClick={() => { cancelDelete() }} style={{
                            width: '70px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid red',
                            color: 'white',
                            backgroundColor: 'red',
                            cursor: 'pointer'
                        }} >HAYIR</Button>

                    </div>
                </div>
            )
            }

        </>
    )
}

export default Navbar