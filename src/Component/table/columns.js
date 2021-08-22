import { Link } from 'react-router-dom';

export const COLUMNS = [
    {
        Header: 'Price',
        accessor: 'price'
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Brand',
        accessor: 'brand'
    },
    {
        Header: 'Engine Capacity',
        accessor: 'engineCapacity'
    },
    {
        Header: 'Registered Date',
        accessor: 'registeredDate'
    },
    {
        Header: 'Mileage',
        accessor: 'mileage'
    },
    {
        Header: 'Category',
        accessor: 'category'
    },
    {
        Header: 'Photo',
        accessor: 'photoUrl',
        Cell: ({ cell: { value }}) => (
            
              <img src={value}/>
            )
    },
    {
        Header: '',
        accessor: 'carPostImage.carpostImage',
        Cell: ({ cell: { value }}) => (
              <img src={"data:image/png;base64," + value} className ="base64Image"/>
            )
    },
    {
        Header: '',
        accessor: 'postId',
        Cell: ({ cell: { value }}) => (
            <Link to={{ pathname:'/carDetail/'+`${value}`}}>More Details</Link>
            )
    }

]
