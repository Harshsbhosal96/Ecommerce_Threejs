import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React, { useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import productsData from '../dummyData'
import '../Style/productDetails.css'
import GsapAnimations from '../utils/gsapAnimations'

interface propsTypes {
    activeProductIndex: number
}

function ProductDetail({ activeProductIndex }: propsTypes) {
    const animation = useRef<GsapAnimations | null>(null);
    const product = useMemo(() => productsData[activeProductIndex], [activeProductIndex]);

    const handleOnClick = () => {
        animation.current!.previousAnimationPage = "ProductDetails"
        animation.current!.currentAnimationPage = 'Compactments'
        animation.current?.productDetails.hideComponent();
    }

    useEffect(() => {
        animation.current = new GsapAnimations();
    }, [])

    return (
        <div className="product_detail_wrapper">
            <h1 className='product_detail_brand'>{product.brand}</h1>
            <h2 className='product_detail_name'>{product.name}</h2>

            <div className='product_detail_summary'>
                <p>
                    Enjoy clear and powerful sound with advanced noise cancellation, perfect for music, calls, and everyday use.
                </p>
                <p>
                    Designed for long hours of comfort with strong battery backup and smooth wireless connectivity.
                </p>
            </div>

            <div className='product_details_spec'>
                <div className='product_detail_specWrapper'>

                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Bluetooth Version</h3>
                            <p>Bluetooth 5.3 (Latest Technology)</p>
                        </div>
                        <div>
                            <h3>Battery Capacity</h3>
                            <p>398 mAh battery for long-lasting usage</p>
                        </div>
                        <div>
                            <h3>Power Supply</h3>
                            <p>93 mWh battery in each earbud stem</p>
                        </div>
                    </section>

                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Sound Sensitivity</h3>
                            <p className='bar' role={'presentation'}></p>
                            <span>90% - 100% (High Clarity)</span>
                        </div>
                        <div>
                            <h3>Frequency Range</h3>
                            <p className='bar' role={'presentation'}></p>
                            <span>100 Hz - 10 kHz</span>
                        </div>
                        <div>
                            <h3>Harmonic Distortion</h3>
                            <p className='bar' role={'presentation'}></p>
                            <span>Low distortion for clear audio output</span>
                        </div>
                    </section>

                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Audio Codec</h3>
                            <p>AAC Bluetooth Codec for better sound quality</p>
                        </div>
                        <div>
                            <h3>Driver Size</h3>
                            <p>11mm driver for powerful bass and clear sound</p>
                        </div>
                        <div>
                            <h3>Product Code</h3>
                            <p>EAN 407 / Article 358627</p>
                        </div>
                    </section>

                </div>
            </div>

            <hr />

            <p 
                onClick={handleOnClick} 
                style={{ marginLeft: 'auto', marginTop: "2em" }} 
                className='hover-effect arrowed_button'
            >
                <Link to="/">
                    <span>Watch Full Details</span>
                    <ArrowUpRightIcon className='icon' />
                </Link>
            </p>
        </div>
    )
}

export default ProductDetail