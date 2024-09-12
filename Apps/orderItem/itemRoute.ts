import { Router } from 'express';
import { addItem, deleteItem, getAllItems, getItemByID } from './itemController';
import { addItemValidator, deleteItemValidator, getItemByIDValidator } from '../../utils/validators/itemValidator';

const ItemRoute:Router = Router( {mergeParams: true} );

ItemRoute.route( '/' )
  .get( getAllItems )
  .post(
    addItemValidator,
    addItem
  );

  ItemRoute.route( '/:id' )
  .get(
    getItemByIDValidator,
    getItemByID
  )

  .delete(
    deleteItemValidator,
    deleteItem
  )


export default ItemRoute;