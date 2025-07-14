import React, { useContext, useEffect, useState } from 'react'
import '../css/Product.css'
import Button from './Button.jsx'
import Card from './Card.jsx';
import CardContent from './CardContent.jsx';
import Pagination from './Pagination.jsx'
import Select from './Select.jsx';
import Filter from './Filter.jsx';
import { CardContext } from '../context/CardContext.jsx';


function Product({ searchProduct }) {

    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [sorting, setSorting] = useState('');

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12;


    //products.slice(start, end) : dizinin belirli bir aralığını döner
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);
    const paginatedFiltered = filtered.slice(startIndex, startIndex + itemsPerPage);


    // const isSearching = searchProduct.trim() !== '';
    const isFiltered = searchProduct.trim() !== '' || selectedBrand !== '' || selectedColor !== '' || sorting !== '';
    const productsToShow = isFiltered ? paginatedFiltered : paginatedProducts;

    const pageCount = Math.ceil((isFiltered ? filtered.length : products.length) / itemsPerPage);
    const handleChange = (page) => setCurrentPage(page);
    //kullanıcının seçtiği sayfa numarasına göre güncelledim


    const url = 'https://686523b85b5d8d03397fe29b.mockapi.io/products/products';

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFiltered(data);

                const brands = [...new Set(data.map((p) => (p.brand)))]
                const colors = [...new Set(data.map((p) => p.color))]

                setBrandOptions(brands)
                setColorOptions(colors)

            })
            .catch((error) => console.log(error))
    }, [])


    useEffect(() => {
        if (searchProduct.length > 1) {
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(searchProduct.toLowerCase())
            );
            setFiltered(filteredProducts);
            setCurrentPage(1)
        }

    }, [searchProduct, products]);


    useEffect(() => {

        let temp = [...products]

        if (searchProduct.length >= 2) {
            temp = temp.filter(product => product.name.toLowerCase().includes(searchProduct.toLowerCase()));
        }

        if (selectedBrand !== '') {
            temp = temp.filter(product => product.brand === selectedBrand)
        }

        if (selectedColor !== '') {
            temp = temp.filter(product => product.color === selectedColor)
        }

        if (sorting !== '') {
            switch (sorting) {
                case 'lowest':
                    temp.sort((a, b) => a.discountedPrice - b.discountedPrice);
                    break;
                case 'highest':
                    temp.sort((a, b) => b.discountedPrice - a.discountedPrice);
                    break;
                case 'az':
                    temp.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'za':
                    temp.sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }
        }

        setFiltered(temp)

    }, [searchProduct, products, selectedBrand, selectedColor, sorting])


    const handleSelect = (value) => {

        if (sorting === value) {
            setSorting('');
            // setFiltered(products);
        }
        else {
            setSorting(value);
        }


        // let sorted = [...(isFiltered ? filtered : products)]

        // switch (value) {
        //     case 'lowest':
        //         sorted.sort((a, b) => a.discountedPrice - b.discountedPrice)
        //         break;
        //     case 'highest':
        //         sorted.sort((a, b) => b.discountedPrice - a.discountedPrice)
        //         break;
        //     case 'az':
        //         sorted.sort((a, b) => a.name.localeCompare(b.name))
        //         break;
        //     case 'za':
        //         sorted.sort((a, b) => b.name.localeCompare(a.name))
        //         break;
        //     default:
        //         break;
        // }

        // if (isSearching) {
        //     setFiltered(sorted)
        // } else (
        //     setProducts(sorted)
        // )


    };

    const { addToCard, cardItems } = useContext(CardContext)

    const colorsCount = {};
    filtered.forEach((product) => {
        const colors = product.color
        if (colorsCount[colors]) {
            colorsCount[colors] += 1;
        } else {
            colorsCount[colors] = 1;
        }
    })


    const brandCount = {};
    filtered.forEach((product) => {
        const brands = product.brand;
        if (brandCount[brands]) {
            brandCount[brands] += 1;
        } else {
            brandCount[brands] = 1;
        }
    })


    return (
        <>
            <div className='searchText' style={{ display: 'flex' }}>
                <p style={{ color: 'gray', marginLeft: '15px' }} >Aranan Kelime: </p>
                <p style={{ color: 'black', marginLeft: '10px' }}> <b>{searchProduct}</b></p>

                <div style={{ position: 'absolute', right: '80px' }}>
                    <Select value={sorting} placeholder="Sıralama" onChange={handleSelect} options={[
                        { value: 'lowest', label: 'En Düşük Fiyat' },
                        { value: 'highest', label: 'En Yüksek Fiyat' },
                        { value: 'az', label: 'En Yeniler (A>Z)' },
                        { value: 'za', label: 'En Yeniler (Z>A)' }
                    ]} />
                </div>

            </div >

            <div style={{ display: 'flex' }}>
                <Filter
                    brandOptions={brandOptions}
                    colorOptions={colorOptions}
                    sortOptions={[
                        { value: 'lowest', label: 'En Düşük Fiyat' },
                        { value: 'highest', label: 'En Yüksek Fiyat' },
                        { value: 'az', label: 'En Yeniler (A>Z)' },
                        { value: 'za', label: 'En Yeniler (Z>A)' }
                    ]}
                    selectedBrand={selectedBrand}
                    selectedColor={selectedColor}
                    selectedSort={sorting}

                    onBrandChange={(brand) => {
                        if (brand === selectedBrand) {
                            setSelectedBrand('')
                        } else {
                            setSelectedBrand(brand)
                        }
                    }}

                    onColorChange={(color) => {
                        if (color === selectedColor) {
                            setSelectedColor('')
                        } else {
                            setSelectedColor(color)
                        }
                    }}
                    onSortChange={handleSelect}
                    colorsCount={colorsCount}
                    brandCount={brandCount}
                >
                </Filter>

                <div className='products-container' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {/* {(searchProduct === "" || searchProduct.length >= 1) && (
                        productsToShow.map((product) => (
                    <div className='product-card' key={product.id} style={{
                        position: 'relative', width: '300px', height: '600px',
                        borderRadius: '10px'
                    }}>
                        <Card className="base-card" style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer'

                        }}><CardContent image={product.image} imageStyle={{
                            height: '400px',
                            width: '100%',
                            objectFit: 'contain',
                            border: '1px solid rgb(222, 222, 222, 1)',
                            borderRadius: '10px',
                            boxSizing: 'border-box',

                        }}
                            name={product.name}
                            showBrandLabel={true}
                            brand={product.brand}
                            color={product.color}
                            discountedPrice={product.discountedPrice}
                            originalPrice={product.originalPrice}
                            rate={product.rate}
                            showColorLabel={true}
                            showOriginalPrice={true}
                            showDiscountedPrice={true}
                            showRate={true}

                        ></CardContent></Card>

                        <Card className="product-hover-card" >
                            <CardContent image={product.imageSecond} imageStyle={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain',
                                padding: '8px',
                                border: '1px solid rgb(222, 222, 222, 1)',
                                borderRadius: '10px',
                                boxSizing: 'border-box',

                            }} name={product.name}
                                showBrandLabel={false}
                                showOriginalPrice={false}
                                showDiscountedPrice={false}
                                showRate={false}
                            //bu kısmı sor 

                            ></CardContent>
                            <Button className='addtocart-btn' onClick={() => { addToCard(product) }} style={
                                {
                                    backgroundColor: '#ff6000',
                                    width: '200px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    //ortalamak için
                                    display: 'block',
                                    margin: '110px auto 0 auto'
                                }
                            } > Sepete Ekle</Button></Card>

                    </div>
                    ))
                    )} */}
                    {productsToShow.map((product) => (
                        <div className='product-card' key={product.id} style={{
                            position: 'relative', width: '300px', height: '600px',
                            borderRadius: '10px'
                        }}>
                            <Card className="base-card" style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                                transition: 'opacity 0.3s ease',
                                cursor: 'pointer'

                            }}><CardContent image={product.image} imageStyle={{
                                height: '400px',
                                width: '100%',
                                objectFit: 'contain',
                                border: '1px solid rgb(222, 222, 222, 1)',
                                borderRadius: '10px',
                                boxSizing: 'border-box',

                            }}
                                name={product.name}
                                showBrandLabel={true}
                                brand={product.brand}
                                color={product.color}
                                discountedPrice={product.discountedPrice}
                                originalPrice={product.originalPrice}
                                rate={product.rate}
                                showColorLabel={true}
                                showOriginalPrice={true}
                                showDiscountedPrice={true}
                                showRate={true}

                            ></CardContent></Card>

                            <Card className="product-hover-card" >
                                <CardContent image={product.imageSecond} imageStyle={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'contain',
                                    padding: '8px',
                                    border: '1px solid rgb(222, 222, 222, 1)',
                                    borderRadius: '10px',
                                    boxSizing: 'border-box',

                                }} name={product.name}
                                    showBrandLabel={false}
                                    showOriginalPrice={false}
                                    showDiscountedPrice={false}
                                    showRate={false}

                                ></CardContent>
                                <Button
                                    disabled={cardItems.some(item => item.id === product.id)} className='addtocart-btn' onClick={() => { addToCard(product) }} style={
                                        {
                                            backgroundColor: '#ff6000',
                                            width: '200px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            //ortalamak için
                                            display: 'block',
                                            margin: '110px auto 0 auto'
                                        }
                                    } >
                                    {cardItems.some(item => item.id === product.id) ? "Bu ürünü sepete ekleyemezsin" : "Sepete Ekle"}

                                </Button>
                            </Card>

                        </div>
                    ))}
                    {/* {productsToShow.map((product) => (
                        <div className='product-card' key={product.id} style={{
                            position: 'relative', width: '300px', height: '600px',
                            borderRadius: '10px'
                        }}>
                            <Card className="base-card" style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                                transition: 'opacity 0.3s ease',
                                cursor: 'pointer'

                            }}><CardContent image={product.image} imageStyle={{
                                height: '400px',
                                width: '100%',
                                objectFit: 'contain',
                                border: '1px solid rgb(222, 222, 222, 1)',
                                borderRadius: '10px',
                                boxSizing: 'border-box',

                            }}
                                name={product.name}
                                showBrandLabel={true}
                                brand={product.brand}
                                color={product.color}
                                discountedPrice={product.discountedPrice}
                                originalPrice={product.originalPrice}
                                rate={product.rate}
                                showColorLabel={true}
                                showOriginalPrice={true}
                                showDiscountedPrice={true}
                                showRate={true}

                            ></CardContent></Card>

                            <Card className="product-hover-card" >
                                <CardContent image={product.imageSecond} imageStyle={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'contain',
                                    padding: '8px',
                                    border: '1px solid rgb(222, 222, 222, 1)',
                                    borderRadius: '10px',
                                    boxSizing: 'border-box',

                                }} name={product.name}
                                    showBrandLabel={false}
                                    showOriginalPrice={false}
                                    showDiscountedPrice={false}
                                    showRate={false}
                                //bu kısmı sor 

                                ></CardContent>
                                <Button className='addtocart-btn' onClick={() => { addToCard(product) }} style={
                                    {
                                        backgroundColor: '#ff6000',
                                        width: '200px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        //ortalamak için
                                        display: 'block',
                                        margin: '110px auto 0 auto'
                                    }
                                } > Sepete Ekle</Button></Card>

                        </div>
                    ))} */}
                </div >
            </div >
            {/* {!isSearching && (
                <div className='pagination'>
                    <Pagination count={pageCount} page={currentPage}
                        onChange={handleChange} variant="outlined" shape="rounded" />
                </div>
            )
            } */}
            {
                productsToShow.length > 0 && (<div className='pagination'>
                    <Pagination count={pageCount} page={currentPage} onChange={handleChange}></Pagination>
                </div >)
            }

        </>
    )
}


export default Product