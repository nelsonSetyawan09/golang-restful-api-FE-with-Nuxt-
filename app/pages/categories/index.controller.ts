import { defineComponent, ref, onMounted } from "vue";
import type { Category } from "@/types/category";
import { EditOrCreate } from "@/types/category";
import { categoryService } from "@/services/categoryService";

export default defineComponent({
  setup() {
    const { categoryResponse, loading, submitting, errMsg } = useCategory();

    const showModal = ref(false);
    const editOrCreate = ref("");
    const selectedId = ref<number | null>(null);

    const categories = ref<Category[]>([]);

    const handleSelectCategory = (category: Category) => {
      selectedId.value = category.id;
      editOrCreate.value = "Edit";
      showModal.value = true;
    };

    const fetchCategories = async () => {
      loading.value = true;
      errMsg.value = "";
      try {
        const response = await categoryService.getAll();
        categories.value = response.data;
      } catch {
        errMsg.value = "Something wrong";
      } finally {
        loading.value = false;
      }
    };

    const handleCreateOrUpdateCategory = async (category: Category | null) => {
      if (submitting.value) return;
      submitting.value = true;

      try {
        if (editOrCreate.value === EditOrCreate.EDIT) {
          await categoryService.update(
            selectedId.value as number,
            category as Category,
          );
        } else {
          await categoryService.create({ name: category!.name ?? "" });
        }

        // Refresh categories
        await fetchCategories();

        showModal.value = false;
        selectedId.value = null;
        editOrCreate.value = "";
      } catch (err) {
        console.log("something wrong", err);
      } finally {
        submitting.value = false;
      }
    };

    onMounted(fetchCategories);

    const showModalCreateCard = () => {
      editOrCreate.value = "Create";
      selectedId.value = null;
      showModal.value = true;
    };

    return {
      categoryResponse,
      categories,
      loading,
      submitting,
      showModal,
      editOrCreate,
      selectedId,
      errMsg,
      handleSelectCategory,
      fetchCategories,
      handleCreateOrUpdateCategory,
      showModalCreateCard,
    };
  },
});
