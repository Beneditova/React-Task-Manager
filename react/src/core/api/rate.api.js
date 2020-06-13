import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl='http://localhost:3005/rates';

export function getAllRates(){
    return axios.get(apiUrl);
}

export async function rateRecipe(recipeId,userId,rate){
    const allRates = (await getAllRates()).data;
    const curentRating = allRates.find(rate=>rate.userId===userId && rate.recipeId === recipeId);
    const rateData = {recipeId:recipeId,userId:userId,rate:rate}
    if(curentRating)
        return axios.put(`${apiUrl}/${curentRating.id}`,rateData);

    return axios.post(apiUrl,rateData);
}

export async function getRateById(id){
    const allRates= (await getAllRates()).data;
    const curentRates = allRates.filter(rate=>rate.recipeId===id);
    const raters = curentRates.length;
    var rateSum = 0;
    curentRates.forEach(rate=>rateSum+=parseInt(rate.rate));
    return rateSum/raters;
}
export async function deleteRateById(recipeId){
    const allRates= (await getAllRates()).data;
    const recipeRates = allRates.filter(rate=>rate.recipeId===recipeId);
    recipeRates.forEach(rate=>axios.delete(`${apiUrl}/${rate.id}`));
}

export async function getUserRateFor(recipeId){
    const loggedUser = getLoggedUser(); 
    const allRates= (await getAllRates()).data;
    
    const userRate = allRates.filter(rate=>rate.recipeId===recipeId && rate.userId ===loggedUser.id);
    return userRate[0].rate;
}