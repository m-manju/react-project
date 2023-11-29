import { useSelector, useDispatch } from 'react-redux';
import { ItemType, incrementQuantity, decrementQuantity  } from '../redux/cart/cart'; 

const Sidebar: React.FC = () => {
  const cartItems: ItemType[] = useSelector((state: any) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity({ id }));
  };

  return (
    <aside className="sidebar">
      <div className='container'>
        <h3>My Reading Room</h3>
        <br />
        <p>Reading-Plans</p>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item: ItemType) => (
              <li key={item.id} className='cartList'>
                <p>{item.bookName}:</p>
                <button className='cartBtn' onClick={() => handleDecrement(item.id)}>-</button>
                days:{item.quantity}
                <button className='cartBtn' onClick={() => handleIncrement(item.id)}>+</button>
                <br />
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p className='emptyCart'>--Your room is empty--</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
