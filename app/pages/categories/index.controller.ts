import { defineComponent, ref, onMounted } from "vue";
import type { Category } from "@/types/category";
import { categoryService } from "@/services/categoryService";

export default defineComponent({
  setup() {
    const { categoryResponse, loading, submitting, errMsg } = useCategory();

    const showModal = ref(false);
    const isEditing = ref(false);
    const selectedId = ref<number | null>(null);

    const categories = ref<Category[]>([]);

    const handleSelectCategory = (category: Category) => {
      selectedId.value = category.id;
      isEditing.value = true;
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

    const handleSubmitCategory = async (category: Category | null) => {
      if (submitting.value || !category || !selectedId.value) {
        return;
      }

      submitting.value = true;

      try {
        const response = await categoryService.update(
          selectedId.value,
          category,
        );

        // Refresh categories
        await fetchCategories();

        // Close modal
        showModal.value = false;
      } catch (err) {
        console.log("something wrong", err);
      } finally {
        submitting.value = false;
      }
    };
    onMounted(fetchCategories);

    return {
      categoryResponse,
      categories,
      loading,
      submitting,
      showModal,
      isEditing,
      selectedId,
      errMsg,
      handleSelectCategory,
      fetchCategories,
      handleSubmitCategory,
    };
  },
});
