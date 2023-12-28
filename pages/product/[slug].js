import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter()
    const {slug} = router.query

    return <p>The slug is : {slug}</p>
}

export default Post