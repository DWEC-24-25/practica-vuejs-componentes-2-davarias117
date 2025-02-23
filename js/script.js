const { createApp, reactive, defineComponent } = Vue;
// Sample data
const server_data = {
    collection: {
        title: "Movie List",
        type: "movie",
        version: "1.0",

        items: [
            {
                href: "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings_(film_series)",
                data: [
                    { name: "name", value: "The Lord of the Rings", prompt: "Name" },
                    { name: "description", value: "The Lord of the Rings is a film series consisting of three high fantasy adventure films directed by Peter Jackson. They are based on the novel The Lord of the Rings by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003). They are a New Zealand-American venture produced by WingNut Films and The Saul Zaentz Company and distributed by New Line Cinema.", prompt: "Description" },
                    { name: "director", value: "Peter Jackson", prompt: "Director" },
                    { name: "datePublished", value: "2001-12-19", prompt: "Release Date" }
                ]
            },
            {
                href: "https://en.wikipedia.org/wiki/The_Hunger_Games_(film_series)",
                data: [
                    { name: "name", value: "The Hunger Games", prompt: "Name" },
                    { name: "description", value: "The Hunger Games film series consists of four science fiction dystopian adventure films based on The Hunger Games trilogy of novels, by the American author Suzanne Collins. Distributed by Lionsgate and produced by Nina Jacobson and Jon Kilik, it stars Jennifer Lawrence as Katniss Everdeen, Josh Hutcherson as Peeta Mellark, Woody Harrelson as Haymitch Abernathy, Elizabeth Banks as Effie Trinket, Philip Seymour Hoffman as Plutarch Heavensbee, Stanley Tucci as Caesar Flickerman, Donald Sutherland as President Snow, and Liam Hemsworth as Gale Hawthorne. Gary Ross directed the first film, while Francis Lawrence directed the next three films.", prompt: "Description" },
                    { name: "director", value: "Gary Ross", prompt: "Director" },
                    { name: "datePublished", value: "2012-03-12", prompt: "Release Date" }
                ]
            },
            {
                href: "https://en.wikipedia.org/wiki/Game_of_Thrones",
                data: [
                    { name: "name", value: "Game of Thrones", prompt: "Name" },
                    { name: "description", value: "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones. It is filmed in Belfast and elsewhere in the United Kingdom, Canada, Croatia, Iceland, Malta, Morocco, Spain, and the United States. The series premiered on HBO in the United States on April 17, 2011, and its seventh season ended on August 27, 2017. The series will conclude with its eighth season premiering in 2019.", prompt: "Description" },
                    { name: "director", value: "Alan Taylor et al", prompt: "Director" },
                    { name: "datePublished", value: "2011-04-17", prompt: "Release Date" }
                ]
            }
        ]
    }
};

// Componente edit-form
const EditForm = defineComponent({
    props:{
        itemData:{
            type: Object,
            required:true
        }
    },
    methods:{
        closeForm()
        {
            this.$emit("formClosed", this.itemData);
        }
    },
    template: `
        <div>
            <p><strong>Name</strong></p>
            <input type="text" class="form-control" v-model ="itemData.name"/>
            <p><strong>Description</strong></p>
            <textarea class="form-control"v-model="itemData.description" style="height: 125px" ></textarea/>
            <p><strong>Director</strong></p>
            <input type="text" class="form-control"v-model ="itemData.director"/ >
            <p><strong>Release Date</strong></p>
            <input type="text" class="form-control" v-model ="itemData.datePublished"/> <br>
            <a class="btn btn-primary" target="_blank" @click="closeForm">Cerrar</a>
        </div>
    `
});

// // Componente item-data
const ItemData = defineComponent({
  props: {
      item: {
          type: Object,
          required: true
      }
  },
  data()
  {
    return {
        visible: true,
        edit: false,
        editableItem:{
            name: this.item.data.find(d=> d.name ==='name').value,
            description: this.item.data.find(d=> d.name ==='description').value,
            director:this.item.data.find(d=> d.name ==='director').value,
            datePublished: this.item.data.find(d=> d.name ==='datePublished').value
        }
    }
  },
  methods:
  {
    toggleEditFormVisibility()
    {
        this.edit = !this.edit;
        this.visible = !this.visible;
    },

    updateItem(updatedData) {
        const item = this.item.data;
        item.find(d => d.name === 'name').value = updatedData.name;
        item.find(d => d.name === 'description').value = updatedData.description;
        item.find(d => d.name === 'director').value = updatedData.director;
        item.find(d => d.name === 'datePublished').value = updatedData.datePublished;
    },
    handleFormClosed(updatedData)
    {
        this.updateItem(updatedData);
        this.toggleEditFormVisibility();
    }
    
  },

  template: `
    <div>
      <div v-if="visible">
          <p><strong>Name</strong><br/>{{ item.data.find(d => d.name === 'name').value }}</p>
          <p><strong>Description</strong><br/>{{ item.data.find(d => d.name === 'description').value }}</p>
          <p><strong>Director</strong><br/> {{ item.data.find(d => d.name === 'director').value }}</p>
          <p><strong>Release Date</strong> <br/>{{ item.data.find(d => d.name === 'datePublished').value }}</p>
          <a :href="item.href" class="btn btn-primary" target="_blank">Ver</a>
          <a class="btn btn-secondary" target="_blank" @click="toggleEditFormVisibility">Editar</a>
      </div>
      <edit-form v-if="edit" :itemData="editableItem" @formClosed="handleFormClosed"/>
    </div>
  `
});

// // Crear la aplicación Vue

const app = createApp({
    setup() {
        const col = reactive(server_data.collection);
        console.log(col)
        return {
           col
        };
    }
});

// // Registrar los componentes globalmente
app.component('edit-form', EditForm);
app.component('item-data', ItemData);

// // Montar la aplicación en el elemento con id 'app'
app.mount('#app');

