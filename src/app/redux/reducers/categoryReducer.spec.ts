import { SelectableList } from './../../util/selectableList';
import { clone } from 'src/app/util/utility';
import { NoteAction } from '../actions/note/noteAction';
import { NoteActionKind } from '../actions/note/noteActionKind';
import { NoteModel } from 'src/app/models/noteModel';
import { CategoryAction } from '../actions/category/categoryAction';
import { CategoryActionKind } from '../actions/category/categoryActionKind';
import { noteReducer } from './noteReducer';
import { NotesRetrievedAction } from '../actions/note/notesRetrievedAction';
import { NotesOfCategoryDeleteAction } from '../actions/note/notesOfCategoryDeleteAction';
import { CategoryModel } from 'src/app/models/categoryModel';
import { categoryReducer } from './categoryReducer';
import { CategoriesRetrievedAction } from '../actions/category/categoriesRetrievedAction';

describe("categoryReducer", () =>
{
  let model1: CategoryModel;
  let model2: CategoryModel;
  let model3: CategoryModel;
  let state: SelectableList<CategoryModel>

  beforeEach(() =>
  {
    model1 = new CategoryModel("1", "title1");
    model2 = new CategoryModel("2", "title2");
    model3 = new CategoryModel("3", "title3");
    state = new SelectableList([model1, model2, model3]);
  })

  it("other action shouldn't change the state", () =>
  {
    let action = new NoteAction(NoteActionKind.NoteAdd, null);
    let result = categoryReducer(state, action);

    expect(result).toBe(state);
  });

  it("add action adds a new category to the state", () =>
  {
    let action = new CategoryAction(CategoryActionKind.CategoryAdd, model1);
    let result = categoryReducer(new SelectableList<CategoryModel>(), action);

    expect(result.count()).toBe(1);
    expect(result.items[0]).toBe(model1);
    expect(result.selectedItem).toBe(model1);
  });

  it("delete action removes the category", () =>
  {
    let modelToRemove = clone<CategoryModel>(model1, CategoryModel);
    let action = new CategoryAction(CategoryActionKind.CategoryDelete, modelToRemove);
    let result = categoryReducer(state, action);

    expect(result.count()).toBe(2);
    expect(result.items).toContain(model2);
    expect(result.items).toContain(model3);
    expect(result.selectedItem).toBe(model2);
  });

  it("delete action with a not exisiting id does not remove any notes", () =>
  {
    let modelToRemove = new CategoryModel("4");
    let action = new CategoryAction(CategoryActionKind.CategoryDelete, modelToRemove);
    let result = categoryReducer(state, action);

    expect(result.count()).toBe(3);
  });

  it("update action updates the category", () =>
  {
    let modelToUpdate = new CategoryModel("1", "newTitle");
    let action = new CategoryAction(CategoryActionKind.CategoryUpdate, modelToUpdate);
    let result = categoryReducer(state, action);

    expect(result.count()).toBe(3);
    expect(result.items[0].title).toBe("newTitle");
  });

  it("retrieved action returns the retrieved categories", () =>
  {
    let categories = [model1, model2];
    let action = new CategoriesRetrievedAction(categories);
    let result = categoryReducer(new SelectableList<CategoryModel>(), action);

    expect(result.count()).toBe(2);
    expect(result.selectedItem).toBe(model1);
    expect(result.items).toContain(model1);
    expect(result.items).toContain(model2);
  });

  it("selected category change action changes the selected category", () =>
  {
    let action = new CategoryAction(CategoryActionKind.SelectedCategoryChange, model3);
    let result = categoryReducer(state, action);

    expect(result.selectedItem).toBe(model3);
  });
});