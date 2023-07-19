type BadgeCategoryProps = {
  category: string;
  selectCategory: string;
  setSelectCategory: (selectCategory: string) => void;
};

function BadgeCategory({ category, selectCategory, setSelectCategory }: BadgeCategoryProps) {
  return (
    <div
      className={
        selectCategory === category
          ? "badge badge-primary ml-1 xl:ml-5 cursor-pointer"
          : "badge badge-outline ml-1 xl:ml-5 cursor-pointer"
      }
      onClick={() => setSelectCategory(category)}
    >
      {category}
    </div>
  );
}

export default BadgeCategory;
