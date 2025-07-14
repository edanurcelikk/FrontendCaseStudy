import React, { createContext, useState, useEffect } from 'react'


export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cardItems, setCardItems] = useState(() => {
    const storedItems = localStorage.getItem('cardItems')
    return storedItems ? JSON.parse(storedItems) : []
  })
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false) // modal
  const [itemToDelete, setItemToDelete] = useState(null) //silinecek ürün

  useEffect(() => {
    localStorage.setItem('cardItems', JSON.stringify(cardItems))
  }, [cardItems])


  const addToCard = (product) => {

    setCardItems(prevItems => {
      const existingItem = prevItems.find(item => (item.id === product.id))
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  };


  const requestDeleteItem = (product) => {
    setItemToDelete(product)
    setDeleteModalOpen(true)
  }

  const confirmDeleteItem = () => {
    //silinecek ürün varsa
    if (itemToDelete) {
      //sepetteki silinmeyecek ürünleri güncelledim silinecek ürünü eklemediğimiz için silindi
      setCardItems(prev => prev.filter(item => item.id !== itemToDelete.id))
      setItemToDelete(null)
      setDeleteModalOpen(false)
    }
  }

  const cancelDelete = () => {
    setItemToDelete(null)
    setDeleteModalOpen(false)
  }

  // const removeFromCard = (productId) => {
  //   setCardItems(prevItems => prevItems.filter(item => item.id !== productId));
  // }


  return (

    <CardContext.Provider value={{ cardItems, addToCard, requestDeleteItem, cancelDelete, confirmDeleteItem, isDeleteModalOpen }}>
      {children}
    </CardContext.Provider>
  )
}

export default CardContext