import Category from '../../models/Category';
import SubCategory from '../../models/SubCategory';
import User from '../../models/User';

export const categoryRule = async (category: string): Promise<boolean> => {
    try {
        const existingCategory = await Category.findOne({ title: category });
        return !!existingCategory;

    } catch (error) {
        throw new Error(`Erro ao conectar ao banco de dados: ${(error as Error).message}`);
    }
};

export const subCategoryRule = async (subcategory: string): Promise<boolean> => {
    try {
        const existingSubCategory = await SubCategory.findOne({ title: subcategory });
        return !!existingSubCategory;

    } catch (error) {
        throw new Error(`Erro ao conectar ao banco de dados: ${(error as Error).message}`);
    }
};

export const existingUser = async (id: string): Promise<boolean> => {
    try {
        const user = await User.findOne({ _id: id });
        return !!user;

    } catch (error) {
        throw new Error(`Erro ao conectar ao banco de dados: ${(error as Error).message}`);
    }
};