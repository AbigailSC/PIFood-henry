import {
    GET_DIETS,
    FILTER_NAME,
    CLEAN_RECIPE,
    SEARCH_NAME,
    FILTER_DIETS,
    FILTER_SCORE,
    GET_RECIPES,
    GET_RECIPE_BY_ID,
    POST_RECIPE
} from '../action-types/index.js';

const initialState = {
    recipes: [],
    copyRecipes: [],
    detail: [],
    diets: [],
}

export function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case POST_RECIPE:
            return{
                ...state
            }
        case CLEAN_RECIPE:
            return{
                ...state,
                detail:[]
            }
        case SEARCH_NAME:
            return{
                ...state,
                recipes: action.payload
            }
        case FILTER_DIETS:
            const copyRecipes = state.copyRecipes;
            //console.log(copyRecipes, "fideos con tuco")
            const dietsFilter = action.payload === 'all' ? copyRecipes : 
            // eslint-disable-next-line array-callback-return
            copyRecipes.filter((recipe) => {
                let diet = recipe.diets.map((dietName) => dietName.name)
                //Las dietas creadas por db tienen un formato distinto
                if(diet.includes(action.payload)){
                    return recipe
                }
            })
            //console.log("Milanga", dietsFilter)
            return{
                ...state,
                recipes: dietsFilter
            }
        case FILTER_NAME:
            let orderName = action.payload === 'asc' ? 
            state.recipes.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
            :
            state.recipes.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
            return{
                ...state,
                recipes: orderName
            }
        case FILTER_SCORE:
            let orderScore = action.payload === 'high' ? 
            state.recipes.sort((a, b) => a.healthScore < b.healthScore ? 1 : -1) 
            : 
            state.recipes.sort((a, b) => a.healthScore < b.healthScore ? -1 : 1)
            return{
                ...state,
                recipes: orderScore
            }
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                copyRecipes: action.payload,
                detail: []
            }
        case GET_RECIPE_BY_ID:
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state
    }
}