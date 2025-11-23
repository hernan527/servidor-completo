import ClinicasModel from './../models/clinicas';
import PlanesModel from "./../models/planes";
import { Clinicas } from '../interfaces/clinicas';
// Define el tipo de tu objeto de regiones para que TypeScript lo entienda mejor
interface RegionesConst {
    [key: string]: string; 
}

// Define el tipo de la salida (el objeto agrupado)
interface ClinicasAgrupadas {
    [region: string]: any[]; // O ClinicaTransformada[], si defines ese tipo
}
async function addClinicas() {
  try {
    const products = await PlanesModel.find({}); // Fetch plans from the database
    const clinicas = await ClinicasModel.find({}); // Fetch clinics from the database

    if (!products || !clinicas) {
      return [];
    }

    for (let i = 0; i < products.length; i++) {
      const clinicPlan = [];

      for (let x in clinicas) {
        const itemId = products[i].item_id;

        // Ensure item_id is defined before checking for inclusion
        if (itemId && clinicas[x].cartillas.includes(itemId)) {
          clinicPlan.push(clinicas[x]);
        }
      }

      // Update documents in MongoDB
      await PlanesModel.updateOne({ _id: products[i]._id }, { clinicas: clinicPlan });
    }

    console.log(products);
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function obtenerPlanesConClinicas() {
  const planesConClinicas = await addClinicas();
  return planesConClinicas;
};

async function getSelectedPlansData(productIds: string[]) {
    // Usamos el array de IDs para obtener solo los documentos necesarios.
    const planesFiltrados = await PlanesModel.find({
        item_id: { $in: productIds } 
    }).lean(); 
    
    return planesFiltrados;
}


// Use the models as needed



// import { ClinicasModel, CotizacionModel, EmployeesModel, EmpresasModel,ItemModel,PlanesModel,UsersModel,PlanesModel} from '../models';


  
const createProduct = async (item: any) => {
    const responseCreate = await PlanesModel.create(item)
    return responseCreate;
};

const getProducts = async (

) => {
    const responseGet = await PlanesModel.find({});
    console.log("responseGet  :",responseGet)
    return responseGet
};

const getProduct = async (id: string) => {
   

    
    const responseGetOne = await PlanesModel.findOne({_id:id})
    console.log( ' responseGetOne : ', id)

    return responseGetOne
};

const updateProduct = async (id: string, data: any) => {
    const responseUpdate = await PlanesModel.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteProduct = async (id: string) => {
    const responsedelete = await PlanesModel.deleteOne({_id:id})
    return responsedelete
};

const searchProducts = async (query: string) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await PlanesModel.find({
        concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    })
    return responseSearch
};

const getPlanes = async () => {

    const responseGet = await obtenerPlanesConClinicas();

    return responseGet
}; 
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts ,getPlanes};

export { obtenerPlanesConClinicas, getSelectedPlansData };
