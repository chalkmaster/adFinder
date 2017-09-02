class CategoryHelper {
  constructor() {
    this.selectedCategory = '';
  }
  get(){
    return this.selectedCategory;
  }
  set(category){
    this.selectedCategory = category;
  }
  clear(){
    this.selectedCategory = '';
  }
}

export default CategoryHelper;