import { createAction, createReducer, on, props } from "@ngrx/store";

export interface IappState {
    searchTerm: string;
}

export const appInitialState: IappState = {
    searchTerm: '' 
}

export const setSearch = createAction(
  '[app] seta o search',
  props<{ searchTerm: string }>() 
);

export const appReducer = createReducer(
    appInitialState,
    on(setSearch, (state, { searchTerm }) => ({
        ...state,
        searchTerm
    }))
);