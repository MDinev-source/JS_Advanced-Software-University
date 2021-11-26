class VeterinaryClinic{
    constructor(clinicName, capacity){
        this.clinicName=clinicName
        this.capacity=capacity
        this.clients=[]
        this.totalProfit=0
        this.currentWorkload=0
        this.pets=0
    }
 
    newCustomer(ownerName, petName, kind, procedures){
            
        if(this.pets==this.capacity){
            
            throw new Error('Sorry, we are not able to accept more patients!')
        }
        else{
            let owner=this.clients.find(c=>c.name==ownerName)
 
            if(owner===undefined){
                
                owner={
                    name: ownerName,
                    pets: []
                }
                this.clients.push(owner)
            }
            let pet=owner.pets.find(p=>p.name===petName)
 
            if(pet===undefined || pet.procedures.length==0){
                
                if(pet===undefined){
                    pet={
                        name: petName,
                        kind: kind.toLowerCase(),
                        owner: ownerName,
                        procedures: [],
                    }
                    owner.pets.push(pet)
                }
                pet.procedures=procedures
                this.pets++
                this.currentWorkload=(this.pets/this.capacity)*100
                return `Welcome ${petName}!`
            }
            else{
 
               throw new Error(`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${pet.procedures.join(', ')}.`)
            }
        }
    }
    
    onLeaving(ownerName, petName){
        let client=this.clients.find(c=>c.name===ownerName)
        
        if(client===undefined){
            
            throw new Error('Sorry, there is no such client!')
        }
        else{
            
            let pet=client.pets.find(p=>p.name===petName)
            
            if(pet===undefined || pet.procedures.length===0){
                
                throw new Error(`Sorry, there are no procedures for ${petName}!`)
            }
            else{
                
                this.totalProfit+=(pet.procedures.length)*500
                pet.procedures=[]
                this.pets--
                this.currentWorkload=(this.pets/this.capacity)*100
                return `Goodbye ${petName}. Stay safe!`
            }
        }
    }
    toString(){
        let output=[
            `${this.clinicName} is ${Math.floor(this.currentWorkload)}% busy today!`,
            `Total profit: ${this.totalProfit.toFixed(2)}$`,
        ]
        this.clients.sort((a, b)=>(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        .forEach(c => {
            output.push(`${c.name} with:`)
            c.pets.sort((a, b)=> (a.name>b.name)? 1 : ((b.name>a.name)?-1:0)).forEach(p=>{
                output.push(`---${p.name} - a ${p.kind} that needs: ${p.procedures.join(', ')}`)
            })
        });
        return output.join('\n')
    }
}