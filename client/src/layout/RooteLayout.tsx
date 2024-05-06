import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useProfileStore } from '../store/profileStore';
import { useSession } from '@clerk/clerk-react';
import { useMutation } from '@apollo/client';
import { CreateProfileMutation, CreateProfileMutationVariables } from '../gql/graphql';
import { CREATE_PROFILE } from '../graphql/mutations/CreateProfile';



function RooteLayout() {
  const profile = useProfileStore((state) => state.profile);
  const {session} = useSession();
  const setProfile = useProfileStore((state) => state.setProfile);
  const [createProfile] = useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CREATE_PROFILE, {});
  console.log(profile)
  useEffect(() => {
    const createProfileFunc = async () => {
      if (!session?.user) {
        return
      }
      try {
        await createProfile({
          variables: {
            input : {
              imageUrl: session?.user.imageUrl,
              name: session?.user.fullName || "",
              email: session?.user.emailAddresses[0].emailAddress,
            }
          },
          onCompleted: (data) => {
            console.log("profile",profile)
            setProfile(data.createProfile)
          },
          refetchQueries: ['GetProfile']
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    if(profile?.id) {
      return
    }

    createProfileFunc();
  }, [session?.user])
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
        <Sidebar/>
        <Outlet />
    </div>
  )
}

export default RooteLayout