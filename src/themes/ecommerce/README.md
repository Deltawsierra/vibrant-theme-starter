
# E-commerce Theme

A modern shopping experience with full product catalog, cart management, and user account features.

## Implemented Features

### Product Catalog
- **Product Grid**: Responsive grid layout with filtering and sorting
- **Product Cards**: Image, price, variants, and quick add-to-cart
- **Category Filtering**: Dynamic category navigation with "All" option
- **Sort Options**: Name, price (low-to-high, high-to-low)
- **Stock Status**: Random out-of-stock simulation with "Notify Me" option

### Product Details
- **Detail Modal**: Full product information with image gallery
- **Variant Selection**: Color and size selectors with visual feedback
- **Quantity Input**: Numeric quantity selection with limits
- **Add to Cart**: Variant-aware cart addition with instant feedback

### Shopping Cart
- **Cart Management**: Add, remove, update quantities, clear cart
- **Item Display**: Product image, name, selected variants, price
- **Total Calculation**: Real-time price totals and item counts
- **Persistence**: localStorage for guests, Supabase-ready for users

### User Account Scaffolding
- **Profile Management**: User details and preferences (placeholder)
- **Order History**: Past purchases and tracking (demo data)
- **Points System**: Loyalty points per purchase (mock increment)
- **Wishlist/Favorites**: Save items for later (localStorage)

### Editorial Content
- **Blog Section**: Articles and buying guides (scaffolded)
- **Lookbook Pages**: Styled product collections (placeholder)
- **Category Filters**: Tag, author, and category navigation
- **Content Management**: Reachable from main navigation

## Context API

The `ShoppingContext` provides:
- Cart state management
- Product catalog access
- User account data
- Order history tracking
- Points and loyalty system

## Components

### Core Shopping
- `ProductCatalog`: Main product grid with filters
- `ProductCard`: Individual product display
- `ProductDetailModal`: Detailed product view
- `ShoppingCart`: Cart management interface

### User Features
- `UserAccount`: Profile and account management
- `OrderHistory`: Purchase tracking
- `Wishlist`: Saved items management

### Editorial
- `BlogSection`: Content and articles
- `Lookbook`: Styled collections
- `BuyingGuides`: Product education

## State Management

```tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants: {
    color: string;
    size: string;
  };
}
```

## Usage

```tsx
import { ShoppingProvider } from './context/ShoppingContext';
import EcommerceLayout from './components/EcommerceLayout';

<ShoppingProvider>
  <EcommerceLayout>
    <ProductCatalog />
  </EcommerceLayout>
</ShoppingProvider>
```

## Data Structure

Products include:
- Basic info (name, price, description)
- Category classification
- Stock status (randomly assigned)
- Variants (colors, sizes)
- Images and media

## Technical Features

- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation, ARIA labels
- **Performance**: Optimized product loading
- **State Persistence**: Cart and user data storage
- **Error Handling**: Out-of-stock and validation

## Integration Points

- Supabase-ready for user accounts
- Stripe-compatible cart structure
- Analytics tracking hooks
- Inventory management APIs

## Demo Data

All products, orders, and user data are currently mock/demo implementations ready for real API integration.
