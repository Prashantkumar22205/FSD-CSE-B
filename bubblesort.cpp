# include <iostream>

using namespace std;

int main(){
    
    int a[5] ;
    for(int i=0 ;i<5 ; i++){
        cout<<"enter the number"<<i <<":";
        cin>>a[i];
    }
     int key;

    for(int i=4;i>=0;i--){
        for(int j=0 ;j<4;j++){
            if(a[j]>a[j+1]){
                 int temp =a[j+1]; 
               a[j+1]= a[j];
               a[j]= temp;
            }
        }

    }

    for(int i=0;i< 5;i++){
        cout<<a[i]<<",";
    }

   
    
    
    
    return 0 ;
}