import {defineField, defineType} from 'sanity';


export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }), 
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }), 
    defineField({
      name: 'isArchived',
      title: 'Is Archived',
      type: 'boolean',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
      archived: 'archived',
      selection: 'selection'
    },
    prepare({ title, publishedAt, selection, archived, media }) {
      const {author} = selection
      const date = new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      return {
        ...selection,
        subtitle: `${author ? `by ${author}` : ''} ${archived ? 'Archived' : 'Published'} on ${new Date(date).toLocaleDateString()}`
      };
      
    },
  },
})
