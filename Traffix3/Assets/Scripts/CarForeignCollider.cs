using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarForeignCollider : MonoBehaviour
{

    private Car parent;

    // Start is called before the first frame update
    void Start()
    {
        parent = transform.parent.GetComponent<Car>();
        gameObject.layer = LayerMask.NameToLayer(parent.bound.direction.ToString());
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider other)
    {
        parent.vel *= Car.DAMP_FACTOR;
    }

    private void OnTriggerExit(Collider other)
    {
        parent.vel = 1f;
    }
}
