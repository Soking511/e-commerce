import{e as n}from"./chunk-OCTLU3GV.js";import{a as d}from"./chunk-T344MZPX.js";import{S as o,X as a,k as c}from"./chunk-TXHN3XOK.js";var u=class i{constructor(t,e){this._ApiService=t;this._MessageService=e;this.loadCart()}cartItemsSubject=new c([]);cart$=this.cartItemsSubject.asObservable();addMessage(t="success",e="Service Message",s="MessageService"){this._MessageService.add({severity:t,summary:e,detail:s})}loadCart(){this._ApiService.get("carts",1,"user").subscribe({next:t=>{let e=t.data.items||[];this.cartItemsSubject.next(e)},error:t=>{}})}getCart=()=>this.cartItemsSubject.getValue();addToCart(t){this.getCart().find(r=>r.product._id===t._id)?this.updateQuantity(t._id,1):this._ApiService.post("carts",{product:t._id}).subscribe({next:()=>{this.addMessage("success","Success","Product added to cart"),this.loadCart()},error:()=>{this.addMessage("error","error","Product Not Have Quantity")}})}removeFromCart(t){this._ApiService.delete("carts",t).subscribe({next:()=>{this.addMessage("info","Success","Product removed from cart"),this.loadCart()}})}updateQuantity(t,e){let r=this.getCart().find(m=>m.product._id===t);if(r){if(r.quantity+e<=0)return this.removeFromCart(r._id);this._ApiService.update("carts",{quantity:r.quantity+e},r._id).subscribe({next:()=>{this.loadCart()},error:()=>{this.addMessage("error","error","Product Not Have Quantity")}})}}emptyCart=()=>this.cartItemsSubject.next([]);static \u0275fac=function(e){return new(e||i)(a(d),a(n))};static \u0275prov=o({token:i,factory:i.\u0275fac,providedIn:"root"})};export{u as a};
