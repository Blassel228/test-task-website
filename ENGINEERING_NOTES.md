Key tradeoffs:  
The database appeared to be not normalized as there are duplicates in the products table, as columns can contain 
not unique names and brand ids, it could be avoided by adding unique constraint for two columns. 
There was a possibility to get only products with unique brands and names.
However, it was decided not to do as it needs to handle the adding product stage.
So the duplicates were considered as sample data fraud\feature.  

The next thing are categories. To get proper counts for categories as for brands, 
a lot of filtering and possibly data queries would be needed to be made, 
there was a possibility to make a loop to get counts one by one excluding products in each previously selected category from each next count, 
so that the counts worked the same way as for brands. Another possible approach would be to try to filter the existing 
products and getting count. I am not sure if it would be worth it. 
So it was decided not to change category counts if another category was chosen, so if products are in two different 
categories and one of the categories is chosen, the count of the second category is not updated: 
the products that are already chosen are not excluded from the second category count.   

Priority was given to the filtering by db queries, as it is more effective. There was a possibility to filter arrays. 
The logic itself is already quite complicated, so probably filtering arrays would make it more inefficient for 
memory, speed and possibly functionality to maintain or expand.  

How you would scale this further:  
Adding authorization, adding payments and product overviews, possibly making recommendations for user searches. 
Adding comments and reviews for each product, payment system. For the backend part there is space and structure 
for scaling. For frontend when the project grows it is better to make Features folder to put more functionality\components\hooks 
for each feature. Another thing is get_db and AsyncSession, it seems it is not about scaling fully, but it would be 
better to make injection of session into the repositories itself instead of methods. 

One non-trivial edge case or technical decision:  
I wouldn`t emphasis any edge cases apart from categories counts that were possible to implement (but is that really an edge case?). 
Another edge case would be letting the user get products that doesn't have any brands, however it was not implemented, as 
I thought about it a bit late, while developing. I believe there are no non-trivial technical decision in the application, 
possibly it can be getting counts by separate endpoints, as getting them can be a little complicated.