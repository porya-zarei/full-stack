import ProfileRoute from "@/components/routes/users/profile";
import {NextPage, GetServerSideProps} from "next";

interface ProfilePageProps {
    slug: string;
}

const ProfilePage: NextPage<ProfilePageProps> = ({slug}) => {
    return (
        <div className="w-full flex justify-center items-center">
            <ProfileRoute slug={slug} />
        </div>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const slug = query?.slug ?? "";
    return {
        props: {
            slug,
        },
    };
};
