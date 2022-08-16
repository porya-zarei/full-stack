import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import Loading from "@/components/core/loadings";
import {useGroups} from "@/hooks/useGroups";
import {useModal} from "@/hooks/useModal";
import useNotification from "@/hooks/useNotification";
import {deleteGroup} from "@/services/groups";
import {getCurrentJalaliYear} from "@/utils/date-helper";
import {FC, useState} from "react";
import {
    HiOutlinePencil,
    HiOutlinePencilAlt,
    HiOutlineTrash,
} from "react-icons/hi";
import AddGroup from "./add-group";
import EditGroup from "./edit-groups";

interface ManageGroupsRouteProps {}

const ManageGroupsRoute: FC<ManageGroupsRouteProps> = () => {
    const {groups, refetch, loading, changeGroups} = useGroups();
    const {notify} = useNotification();
    const {
        ModalWrapper: ModalWrapperAdd,
        handleClose: handleCloseAdd,
        handleOpen: handleOpenAdd,
    } = useModal();
    const {
        ModalWrapper: ModalWrapperEdit,
        handleClose: handleCloseEdit,
        handleOpen: handleOpenEdit,
    } = useModal();
    const currentYear = getCurrentJalaliYear();
    const [selectedGroupId, setSelectedGroupId] = useState("");
    const handleDeleteGroup = (id: string) => async () => {
        try {
            const result = await deleteGroup(id);
            if (result && result.ok && result.data) {
                changeGroups((prev) => prev.filter((group) => group.id !== id));
                notify("گروه با موفقیت حذف شد", {
                    type: "success",
                });
            } else {
                notify(`خطا در حذف گروه | ${result.error}`, {
                    type: "error",
                });
            }
        } catch (error) {
            console.log("error in delete product category => ", error);
            notify("خطا در حذف گروه", {
                type: "error",
            });
        }
    };

    const handleEditGroup = (id: string) => async () => {
        setSelectedGroupId(id);
        handleOpenEdit();
    };
    return (
        <RouteContainer>
            <FrameContainer className="m-4 border-primary content-center items-start">
                <div className="w-full h-full flex items-start justify-center flex-wrap content-start p-3">
                    <div className="w-full flex items-center justify-center my-3">
                        <h3 className="text-2xl font-semibold border-b-2 border-secondary">
                            مدیریت گروه ها
                        </h3>
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap my-3">
                        <button
                            onClick={handleOpenAdd}
                            type="button"
                            className="w-full text-lg flex items-center justify-center m-1 bg-info rounded-full p-3">
                            <span className="text-lg font-semibold">
                                <HiOutlinePencil />
                            </span>
                            <span>افزودن گروه جدید</span>
                        </button>
                        <ModalWrapperAdd>
                            <AddGroup
                                refetch={refetch}
                                handleClose={handleCloseAdd}
                            />
                        </ModalWrapperAdd>
                        <ModalWrapperEdit>
                            {selectedGroupId.length > 0 && (
                                <EditGroup
                                    group={groups.find(
                                        (g) => g.id === selectedGroupId,
                                    )}
                                    handleClose={handleCloseEdit}
                                    refetch={refetch}
                                />
                            )}
                        </ModalWrapperEdit>
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap p-1 md:p-3">
                        {loading ? (
                            <Loading />
                        ) : (
                            groups.map((group) => (
                                <div
                                    key={group.id}
                                    className="w-full flex flex-nowrap items-center justify-start my-2">
                                    <div className="w-4/12 flex items-center justify-start">
                                        <h4 className="font-bold">
                                            {group.name}
                                        </h4>
                                    </div>
                                    <div className="w-8/12 flex items-center justify-between flex-nowrap">
                                        <div className="w-auto flex items-center justify-center text-sm">
                                            محدودیت هزینه :{" "}
                                            {
                                                group.moneyLimitYears.find(
                                                    (ml) =>
                                                        ml.year === currentYear,
                                                )?.limit
                                            }
                                        </div>
                                        <div className="flex justify-center items-center text-lg overflow-hidden rounded-md">
                                            <button
                                                title="ویرایش"
                                                type="button"
                                                onClick={handleEditGroup(
                                                    group.id,
                                                )}
                                                className="bg-primary text-white font-semibold px-4 py-2">
                                                <HiOutlinePencilAlt />
                                            </button>
                                            <button
                                                title="حذف"
                                                type="button"
                                                onClick={handleDeleteGroup(
                                                    group.id,
                                                )}
                                                className="bg-danger text-white font-semibold px-4 py-2">
                                                <HiOutlineTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default ManageGroupsRoute;
