import React from 'react'

const Productos = React.lazy(() => import('containers/productos/Productos'))
const Categorias = React.lazy(() => import('containers/categorias/Categorias'))
const CategoriasFormulario = React.lazy(() => import('containers/categorias/CategoriasFormulario'))
const ProductosFormulario = React.lazy(() => import('containers/productos/ProductosFormulario'))
const Facturas = React.lazy(() => import('views/productos/Productos'))


const routes = [
  { path: '/productos', name: 'Productos', element: Productos },
  { path: '/categorias', name: 'Categorias', element: Categorias },
  { path: '/categorias/agregar', name: 'Agregar Categoria', element: CategoriasFormulario },
  { path: '/categorias/actualizar/:id', name: 'Actualizar Categoria', element: CategoriasFormulario },
  { path: '/productos/agregar', name: 'Agregar Producto', element: ProductosFormulario },
  { path: '/productos/actualizar/:id', name: 'Actualizar Producto', element: ProductosFormulario },
  { path: '/facturas', name: 'Facturas', element: Facturas },
]

export default routes
