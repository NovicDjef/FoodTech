import { getchSomeMenu } from '../../services/routeApi';
import { fetchMenusRequest, fetchMenusSuccess, fetchMenusFailure } from '../reducer/menuReducer';

export const fetchMenus = () => async (dispatch) => {
  dispatch(fetchMenusRequest());
  try {
    const response = await getchSomeMenu() // Remplacez par votre URL d'API
    dispatch(fetchMenusSuccess(response.data));
  } catch (error) {
    dispatch(fetchMenusFailure(error.toString()));
  }
};

