import { createCardDependencies } from "../../../composition/card/createCardDependencies";


export async function loadCountryByName(name: string) {

    const { getCountryByNameUseCase } = createCardDependencies()

    console.log(name);

    return getCountryByNameUseCase.execute(name)

}

export const card = (name: string) => loadCountryByName(name)