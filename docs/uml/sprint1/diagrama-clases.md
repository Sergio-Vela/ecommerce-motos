# Diagrama de Clases — Sprint 1

## Clase Usuario

Atributos:
- id
- nombre
- correo
- contraseña
- rol

---

## Clase Producto

Atributos:
- id
- nombre
- descripcion
- precio
- stock
- imagen

---

## Clase Categoria

Atributos:
- id
- nombre

---

## Clase Carrito

Atributos:
- id
- fecha
- total

---

## Clase Pedido

Atributos:
- id
- fecha
- total
- estado

---

## Clase DetallePedido

Atributos:
- id
- cantidad
- subtotal

---

# Relaciones iniciales

- Un usuario puede tener varios pedidos.
- Un pedido puede tener varios productos.
- Un producto pertenece a una categoría.
- Un carrito pertenece a un usuario.
- Un pedido contiene detalles de pedido.