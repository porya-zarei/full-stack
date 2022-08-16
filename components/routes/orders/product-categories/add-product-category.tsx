import CInput from "@/components/core/inputs";
import CSelectOption from "@/components/core/inputs/select";
import Loading from "@/components/core/loadings";
import {useGroups} from "@/hooks/useGroups";
import useNotification from "@/hooks/useNotification";
import {createProductCategory} from "@/services/product-categories";
import {ICreateProductCategory} from "@/types/data";
import {isAPIResultOk, isValid} from "@/utils/validations";
import {FC, useState} from "react";
import {HiOutlineX} from "react-icons/hi";

interface AddProductCategoryProps {
    handleClose: () => void;
    refetch: () => Promise<void>;
}

const AddProductCategory: FC<AddProductCategoryProps> = ({
    handleClose,
    refetch,
}) => {
    const {groups} = useGroups();
    const {notify} = useNotification();
    const [group, setGroup] = useState("");
    const [englishName, setEnglishName] = useState("");
    const [persianName, setPersianName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        console.log(group, englishName, persianName);
        if (isValid([englishName, persianName])) {
            try {
                setLoading(true);
                const data: ICreateProductCategory = {
                    group,
                    name: persianName,
                    key: englishName,
                };
                const result = await createProductCategory(data);
                if (isAPIResultOk(result)) {
                    notify("دسته بندی با موفقیت ایجاد شد", {
                        type: "success",
                    });
                    refetch().then(() => {
                        setEnglishName("");
                        setPersianName("");
                        setGroup("");
                    });
                } else {
                    notify(`خطا در ایجاد دسته بندی: ${result?.error}`, {
                        type: "error",
                    });
                }
            } catch (error) {
                notify("خطا در ایجاد دسته بندی", {
                    type: "error",
                });
                console.log("error i create product category => ", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="relative w-full h-full md:max-w-md bg-light rounded-t-3xl md:rounded-xl flex items-start justify-center flex-wrap content-start p-4">
            <button
                type="button"
                title="بستن"
                className="absolute top-0 right-0 m-4 text-danger"
                onClick={() => {
                    setEnglishName("");
                    setPersianName("");
                    setGroup("");
                    handleClose();
                }}>
                <HiOutlineX />
            </button>
            <div className="w-full flex items-center justify-center mt-3">
                <h3 className="text-2xl font-semibold border-b-2 border-secondary">
                    افزودن دسته بندی جدید
                </h3>
            </div>
            <div className="w-full mt-5 flex items-start justify-center flex-wrap content-start">
                <div className="w-full flex items-center justify-center my-3">
                    <CSelectOption
                        containerClassName="rounded-md border-2 border-gray p-2"
                        placeholder="انتخاب گروه"
                        value={group.toString()}
                        name="group"
                        onChange={(e) => setGroup(e.target.value)}
                        options={groups.map((g) => ({
                            label: g.name,
                            value: g.id,
                        }))}
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                        type="text"
                        value={englishName}
                        name={"english-name"}
                        onChange={(e) => setEnglishName(e.target.value)}
                        title="نام انگلیسی"
                        placeholder="type here... (name-subname-...)"
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                        type="text"
                        value={persianName}
                        name={"persian-name"}
                        onChange={(e) => setPersianName(e.target.value)}
                        title="نام فارسی"
                        placeholder="اینجا بنویسید... (نام-زیرنام-...)"
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <button
                        type="button"
                        disabled={loading}
                        className="w-full bg-primary text-white rounded-md border-2 border-primary p-2"
                        onClick={handleSubmit}>
                        {loading ? <Loading size={20} /> : "افزودن"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductCategory;
