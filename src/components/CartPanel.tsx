import React from 'react';
import { CartItem } from '../types/store';
import '../Style/cartPanel.css';

interface CartPanelProps {
    isOpen: boolean;
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    onClose: () => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
    onClear: () => void;
}

function CartPanel({
    isOpen,
    cartItems,
    cartCount,
    cartTotal,
    onClose,
    onIncrease,
    onDecrease,
    onRemove,
    onClear,
}: CartPanelProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className='cart_panel_backdrop' onClick={onClose}>
            <aside className='cart_panel' onClick={(event) => event.stopPropagation()}>
                <div className='cart_panel_header'>
                    <div>
                        <span className='cart_panel_eyebrow'>Shopping Cart</span>
                        <h3>{cartCount} item{cartCount === 1 ? '' : 's'}</h3>
                    </div>
                    <button type='button' className='cart_panel_close' onClick={onClose}>
                        Close
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className='cart_panel_empty'>
                        <p>Your cart is empty.</p>
                        <small>Add a product to see it here.</small>
                    </div>
                ) : (
                    <>
                        <div className='cart_panel_items'>
                            {cartItems.map((item) => (
                                <div key={item.id} className='cart_panel_item'>
                                    <div>
                                        <p className='cart_panel_item_brand'>{item.brand}</p>
                                        <h4>{item.name}</h4>
                                        <span className='cart_panel_item_price'>₹{item.price.toLocaleString()}</span>
                                    </div>

                                    <div className='cart_panel_item_actions'>
                                        <div className='cart_panel_quantity_controls'>
                                            <button type='button' onClick={() => onDecrease(item.id)}>
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button type='button' onClick={() => onIncrease(item.id)}>
                                                +
                                            </button>
                                        </div>

                                        <button
                                            type='button'
                                            className='cart_panel_remove'
                                            onClick={() => onRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='cart_panel_footer'>
                            <div className='cart_panel_total'>
                                <span>Total</span>
                                <strong>₹{cartTotal.toLocaleString()}</strong>
                            </div>

                            <div className='cart_panel_footer_actions'>
                                <button type='button' className='cart_panel_clear' onClick={onClear}>
                                    Clear cart
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}

export default CartPanel;
