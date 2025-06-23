This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Starting with architecture : 

I am using Feature Sliced Design architecture, in this architecture we are trying to have one flows between the entities
- 1 shared - All shared libraries/api/database/comoponents/utils (Global Things)
- 2 app - As I am using NextJS, so we are going to use the app folder to utilize NextJS's structured route functionality
- 3 _components or (features) - In our case, we have only one features which is 'rooms', in a real world application it can be products, sales, users etc.
 
Our usage flow would be like this : 
     
     {Shared}
     
      |    |
      v    v

{app}   -->  {features/_components}

## Sever Side State Management
- I have used TanStack react query as it provides hooks like useQuery, useMutation and most important in our use case useInfiniteQuery
- I have created custom hooks to fetch Rooms (useInfiniteRooms, useGetRoomById) with a batch of 10, in pages
- Two APIs are being used :
1. /api/rooms?page=1 -  'page' param to share the page's last index to the nextjs server route, to fetch the next 10 rooms after that index 
2. /api/rooms?Id={id} - 'id' param to find room with that particular ID
   

## Performance Optimizations : 
- I have created a custom LazyLoadingWrapper which will only render the component when its intersected otherwise a fallback will be shown
- LazyLoadingWrapper uses another customHook that I have built which uses IntersectionObserver API to export whether the said element is intersected or not
- Just for the sake of it, I have used "lazy" loading of a "Variant" card so that the code is imported when its needed
- For media I have created two comoponents OptimizedVideo and OptimizedImage both of them uses the same IntersectionObserver API so when they are intersected only then they will be loaded
- I have created custom hook for throttling and used it for the pageFetcher function to throttle it with around 500 milliseconds


## Error Handling : 
- I have built 3 Level of Error Handling 
1. Global Level - To handle any framework, provider or thirdparty library issues or if something missed by other 2 levels  
2. Page Level - To handle page crash scenarios like data fetching, route level failure
3. Feature Level - To catch any Individual feature crash, can be a nested one like Map view.

## UI Theme 
Used this "https://www.subframe.com/library/theme" to generate a UI theme styles to use with tailwind


