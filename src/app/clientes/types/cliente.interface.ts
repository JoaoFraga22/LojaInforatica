import { NacionalidadeInterface } from "./nacionalidade.interface"

export interface ClienteInterface {
    id: number
    nome: string
    genero: string
    dataNascimento?: string
    nacionalidade?: NacionalidadeInterface
}