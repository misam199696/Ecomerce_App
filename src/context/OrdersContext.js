import React, { createContext, useContext, useState } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    const orderWithId = {
      ...order,
      id: Date.now().toString(),
      orderDate: new Date().toISOString(),
      status: 'Processing' // Can be: Processing, Shipped, Delivered, Cancelled
    };
    
    setOrders(prevOrders => [orderWithId, ...prevOrders]);
    return orderWithId;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrderById, 
      updateOrderStatus 
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
