import { createCardDependencies } from "@composition/card/createCardDependencies"



export async function loadCountryByName(name: string) {

    const { getCountryByNameUseCase } = createCardDependencies()


    return getCountryByNameUseCase.execute(name)

}

export const card = (name: string) => loadCountryByName(name)